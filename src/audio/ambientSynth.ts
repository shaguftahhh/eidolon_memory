/**
 * Web Audio API ambient audio synthesizer for "THE LAST MESSAGE"
 * Provides subtle analog tape hum, soft candle resonance, and cassette clicks.
 */

class AmbientSoundEngine {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private masterGain: GainNode | null = null;
  private droneOsc1: OscillatorNode | null = null;
  private droneOsc2: OscillatorNode | null = null;
  private tapeHissNode: AudioBufferSourceNode | null = null;

  public init() {
    if (this.ctx) return;
    try {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtxClass();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    } catch {
      // Audio not supported or blocked
    }
  }

  public toggle(): boolean {
    if (!this.ctx) {
      this.init();
    }
    if (!this.ctx) return false;

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    if (this.isPlaying) {
      this.stopAtmosphere();
      this.isPlaying = false;
    } else {
      this.startAtmosphere();
      this.isPlaying = true;
    }
    return this.isPlaying;
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  private startAtmosphere() {
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;

    // Soft 55Hz & 110Hz warm sub drone
    this.droneOsc1 = this.ctx.createOscillator();
    this.droneOsc1.type = 'sine';
    this.droneOsc1.frequency.setValueAtTime(55, now);

    this.droneOsc2 = this.ctx.createOscillator();
    this.droneOsc2.type = 'triangle';
    this.droneOsc2.frequency.setValueAtTime(110.2, now);

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(240, now);

    const droneGain = this.ctx.createGain();
    droneGain.gain.setValueAtTime(0.001, now);
    droneGain.gain.exponentialRampToValueAtTime(0.2, now + 3);

    this.droneOsc1.connect(filter);
    this.droneOsc2.connect(filter);
    filter.connect(droneGain);
    droneGain.connect(this.masterGain);

    this.droneOsc1.start();
    this.droneOsc2.start();

    // Subtle gentle analog tape noise buffer
    try {
      const bufferSize = this.ctx.sampleRate * 2;
      const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = (Math.random() * 2 - 1) * 0.015;
      }

      this.tapeHissNode = this.ctx.createBufferSource();
      this.tapeHissNode.buffer = noiseBuffer;
      this.tapeHissNode.loop = true;

      const hissFilter = this.ctx.createBiquadFilter();
      hissFilter.type = 'bandpass';
      hissFilter.frequency.setValueAtTime(800, now);
      hissFilter.Q.setValueAtTime(1.5, now);

      this.tapeHissNode.connect(hissFilter);
      hissFilter.connect(this.masterGain);
      this.tapeHissNode.start();
    } catch {
      // Ignore buffer failures
    }
  }

  private stopAtmosphere() {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    if (this.droneOsc1) {
      try { this.droneOsc1.stop(now + 0.5); } catch {}
      this.droneOsc1 = null;
    }
    if (this.droneOsc2) {
      try { this.droneOsc2.stop(now + 0.5); } catch {}
      this.droneOsc2 = null;
    }
    if (this.tapeHissNode) {
      try { this.tapeHissNode.stop(now + 0.2); } catch {}
      this.tapeHissNode = null;
    }
  }

  /**
   * Mechanical cassette deck latch click
   */
  public playCassetteClick() {
    if (!this.ctx || !this.isPlaying || !this.masterGain) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(80, now + 0.04);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start(now);
      osc.stop(now + 0.05);
    } catch {}
  }

  /**
   * Crystalline memory recall chime
   */
  public playMemoryRecallChime(freq = 440) {
    if (!this.ctx || !this.isPlaying || !this.masterGain) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.5, now + 0.8);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);

      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start(now);
      osc.stop(now + 1.2);
    } catch {}
  }
}

export const soundEngine = new AmbientSoundEngine();
