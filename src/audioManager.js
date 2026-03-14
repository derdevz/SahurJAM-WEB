export class AudioManager {
  constructor() {
    this.ctx = null;
    this.enabled = true;
  }

  ensureContext() {
    if (!this.enabled) return null;
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (this.ctx.state === "suspended") {
      this.ctx.resume();
    }
    return this.ctx;
  }

  unlock() {
    this.ensureContext();
  }

  tone({ frequency = 440, duration = 0.12, type = "sine", gain = 0.04, slideTo = null }) {
    const ctx = this.ensureContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const amp = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(frequency, now);
    if (slideTo !== null) {
      osc.frequency.linearRampToValueAtTime(slideTo, now + duration);
    }

    amp.gain.setValueAtTime(0.0001, now);
    amp.gain.exponentialRampToValueAtTime(Math.max(0.0001, gain), now + 0.02);
    amp.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc.connect(amp);
    amp.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + duration + 0.02);
  }

  playMenuStart() {
    this.tone({ frequency: 392, duration: 0.1, type: "triangle", gain: 0.04 });
    setTimeout(() => this.tone({ frequency: 523, duration: 0.14, type: "triangle", gain: 0.04 }), 70);
  }

  playInteract() {
    this.tone({ frequency: 620, duration: 0.05, type: "square", gain: 0.02, slideTo: 560 });
  }

  playServe(comboMultiplier = 1) {
    const pitch = 540 + (comboMultiplier - 1) * 40;
    this.tone({ frequency: pitch, duration: 0.12, type: "triangle", gain: 0.045, slideTo: pitch + 120 });
    setTimeout(() => this.tone({ frequency: pitch + 180, duration: 0.1, type: "triangle", gain: 0.035 }), 80);
  }

  playFail() {
    this.tone({ frequency: 220, duration: 0.16, type: "sawtooth", gain: 0.035, slideTo: 160 });
  }

  playWarning() {
    this.tone({ frequency: 300, duration: 0.08, type: "square", gain: 0.02 });
  }

  playChopTick() {
    this.tone({ frequency: 800, duration: 0.03, type: "square", gain: 0.015 });
  }
}
