/**
 * ==============================================================================
 *  audioConfig.js - CONFIGURACIÓN DE SONIDOS DEL MINI JUEGO DE SANDINO
 * ==============================================================================
 *  ¡ESTA ES LA SECCIÓN PARA QUE AGREGUES TUS SONIDOS A TU PROPIO GUSTO!
 * 
 *  INSTRUCCIONES:
 *  1. Puedes colocar tus archivos de audio (.mp3, .wav, .ogg) en una carpeta llamada 
 *     'sounds/' dentro de 'Mini_juego/' (o en cualquier ruta que prefieras).
 *  2. Simplemente cambia las rutas en el objeto `CUSTOM_AUDIO_FILES` más abajo.
 *  3. Si dejas las rutas en blanco (""), el juego utilizará automáticamente el
 *     SINTETIZADOR PROCEDURAL (Web Audio API) que genera sonidos arcade en tiempo real.
 * ==============================================================================
 */

const AUDIO_CONFIG = {
    // Activar o desactivar sonido por defecto
    soundEnabled: true,
    musicEnabled: true,

    // Volúmenes generales (de 0.0 a 1.0)
    sfxVolume: 0.6,
    musicVolume: 0.4,

    /**
     * ==========================================================================
     *  >>> ZONA DE PERSONALIZACIÓN DE ARCHIVOS DE AUDIO DEL USUARIO <<<
     *  Coloca aquí tus rutas de archivos de sonido cuando los tengas listos:
     * ==========================================================================
     */
    CUSTOM_AUDIO_FILES: {
        // --- EFECTOS DE SONIDO (SFX) ---
        jump: "",          // Ejemplo: "sounds/salto.mp3"
        itemCollect: "",   // Ejemplo: "sounds/moneda.mp3" (bandera/manifiesto)
        attack: "",        // Ejemplo: "sounds/machete.mp3"
        shoot: "",         // Ejemplo: "sounds/disparo_fusil.mp3"
        bossHit: "",       // Ejemplo: "sounds/impacto_jefe.mp3"
        bossDefeat: "",    // Ejemplo: "sounds/jefe_derrotado.mp3"
        bossShoot: "",     // Ejemplo: "sounds/disparo_jefe.mp3"
        mapOpen: "",       // Ejemplo: "sounds/abrir_mapa.mp3"
        ammoReload: "",    // Ejemplo: "sounds/recarga.mp3"
        enemyDefeat: "",   // Ejemplo: "sounds/enemigo_derrotado.mp3"
        playerHit: "",     // Ejemplo: "sounds/golpe.mp3"
        levelWin: "",      // Ejemplo: "sounds/nivel_completado.mp3"
        gameOver: "",      // Ejemplo: "sounds/derrota.mp3"
        dialogueNext: "",  // Ejemplo: "sounds/dialogo.mp3"

        // --- MÚSICA DE FONDO POR NIVELES (BGM) ---
        bgmNivel1: "",     // Ejemplo: "sounds/musica_niquinohomo.mp3"
        bgmNivel2: "",     // Ejemplo: "sounds/musica_san_albino.mp3"
        bgmNivel3: "",     // Ejemplo: "sounds/musica_segovieas.mp3"
        bgmNivel4: "",     // Ejemplo: "sounds/musica_victoria.mp3"
        bgmNivel5: "",     // Ejemplo: "sounds/musica_wiwili.mp3"
        bgmNivel6: ""      // Ejemplo: "sounds/musica_epilogo.mp3"
    }
};

/**
 * ==============================================================================
 *  GESTOR DE AUDIO Y SINTETIZADOR DE SONIDO (WEB AUDIO API)
 *  Garantiza que el juego tenga sonido inmediatamente sin necesidad de archivos externos.
 * ==============================================================================
 */
class SoundManager {
    constructor() {
        this.ctx = null;
        this.enabled = AUDIO_CONFIG.soundEnabled;
        this.musicEnabled = AUDIO_CONFIG.musicEnabled;
        this.audioElements = {};
        this.currentMusic = null;
        this.initialized = false;
    }

    /**
     * Inicializa el contexto de audio tras la primera interacción del usuario
     */
    init() {
        if (this.initialized) return;
        try {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            this.ctx = new AudioContext();
            this.initialized = true;

            // Pre-cargar archivos personalizados si están definidos
            for (const [key, path] of Object.entries(AUDIO_CONFIG.CUSTOM_AUDIO_FILES)) {
                if (path && path.trim() !== "") {
                    const audio = new Audio(path);
                    audio.preload = "auto";
                    this.audioElements[key] = audio;
                }
            }
        } catch (e) {
            console.warn("Web Audio API no soportado en este navegador.", e);
        }
    }

    // Asegurar que el AudioContext esté activo
    ensureActive() {
        if (!this.initialized) this.init();
        if (this.ctx && this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }

    /**
     * Reproduce un efecto de sonido
     */
    play(soundName) {
        if (!this.enabled) return;
        this.ensureActive();

        // 1. Si el usuario definió un archivo de sonido personalizado, usarlo
        if (this.audioElements[soundName]) {
            try {
                const audio = this.audioElements[soundName].cloneNode();
                audio.volume = AUDIO_CONFIG.sfxVolume;
                audio.play().catch(() => {});
                return;
            } catch (e) {}
        }

        // 2. Si no hay archivo personalizado, generar sonido procedural sintético
        this.playSyntheticSound(soundName);
    }

    /**
     * Sintetizador retro procedural usando Web Audio API
     */
    playSyntheticSound(name) {
        if (!this.ctx) return;
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.connect(gain);
        gain.connect(this.ctx.destination);

        switch (name) {
            case 'jump':
                // Sonido ascendente tipo salto de plataforma
                osc.type = 'square';
                osc.frequency.setValueAtTime(160, now);
                osc.frequency.exponentialRampToValueAtTime(440, now + 0.14);
                gain.gain.setValueAtTime(0.18 * AUDIO_CONFIG.sfxVolume, now);
                gain.gain.exponentialRampToValueAtTime(0.01, now + 0.14);
                osc.start(now);
                osc.stop(now + 0.15);
                break;

            case 'itemCollect':
                // Sonido armónico brillante al recoger banderas/manifiestos
                osc.type = 'sine';
                osc.frequency.setValueAtTime(587.33, now); // Re
                osc.frequency.setValueAtTime(880, now + 0.08); // La
                gain.gain.setValueAtTime(0.22 * AUDIO_CONFIG.sfxVolume, now);
                gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);
                osc.start(now);
                osc.stop(now + 0.26);
                break;

            case 'attack':
                // Sonido de tajo de machete (rápido y afilado)
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(480, now);
                osc.frequency.exponentialRampToValueAtTime(110, now + 0.12);
                gain.gain.setValueAtTime(0.25 * AUDIO_CONFIG.sfxVolume, now);
                gain.gain.exponentialRampToValueAtTime(0.01, now + 0.12);
                osc.start(now);
                osc.stop(now + 0.13);
                break;

            case 'shoot':
                // Disparo de fusil máuser (estampido con golpe seco)
                osc.type = 'sawtooth';
                osc.frequency.setValueAtTime(800, now);
                osc.frequency.exponentialRampToValueAtTime(50, now + 0.15);
                gain.gain.setValueAtTime(0.35 * AUDIO_CONFIG.sfxVolume, now);
                gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
                osc.start(now);
                osc.stop(now + 0.16);
                break;

            case 'bossHit':
                // Impacto contundente contra el blindaje/jefe
                osc.type = 'square';
                osc.frequency.setValueAtTime(140, now);
                osc.frequency.exponentialRampToValueAtTime(45, now + 0.18);
                gain.gain.setValueAtTime(0.3 * AUDIO_CONFIG.sfxVolume, now);
                gain.gain.exponentialRampToValueAtTime(0.01, now + 0.18);
                osc.start(now);
                osc.stop(now + 0.19);
                break;

            case 'bossDefeat':
                // Gran explosión/derrota de jefe histórico
                osc.type = 'sawtooth';
                osc.frequency.setValueAtTime(180, now);
                osc.frequency.exponentialRampToValueAtTime(30, now + 0.7);
                gain.gain.setValueAtTime(0.4 * AUDIO_CONFIG.sfxVolume, now);
                gain.gain.exponentialRampToValueAtTime(0.01, now + 0.7);
                osc.start(now);
                osc.stop(now + 0.72);
                break;

            case 'bossShoot':
                // Disparo de ametralladora o cañón del jefe
                osc.type = 'square';
                osc.frequency.setValueAtTime(320, now);
                osc.frequency.exponentialRampToValueAtTime(70, now + 0.12);
                gain.gain.setValueAtTime(0.22 * AUDIO_CONFIG.sfxVolume, now);
                gain.gain.exponentialRampToValueAtTime(0.01, now + 0.12);
                osc.start(now);
                osc.stop(now + 0.13);
                break;

            case 'mapOpen':
                // Campaneo histórico al abrir el mapa de Nicaragua
                osc.type = 'sine';
                osc.frequency.setValueAtTime(523.25, now); // Do
                osc.frequency.setValueAtTime(659.25, now + 0.08); // Mi
                osc.frequency.setValueAtTime(783.99, now + 0.16); // Sol
                gain.gain.setValueAtTime(0.2 * AUDIO_CONFIG.sfxVolume, now);
                gain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);
                osc.start(now);
                osc.stop(now + 0.36);
                break;

            case 'ammoReload':
                // Cerrojo del fusil (recarga rápida)
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(350, now);
                osc.frequency.setValueAtTime(550, now + 0.06);
                gain.gain.setValueAtTime(0.18 * AUDIO_CONFIG.sfxVolume, now);
                gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
                osc.start(now);
                osc.stop(now + 0.16);
                break;

            case 'enemyDefeat':
                // Sonido de derribar o superar obstáculo
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(260, now);
                osc.frequency.linearRampToValueAtTime(120, now + 0.2);
                gain.gain.setValueAtTime(0.25 * AUDIO_CONFIG.sfxVolume, now);
                gain.gain.linearRampToValueAtTime(0.01, now + 0.2);
                osc.start(now);
                osc.stop(now + 0.21);
                break;

            case 'playerHit':
                // Sonido de impacto al recibir daño
                osc.type = 'square';
                osc.frequency.setValueAtTime(130, now);
                osc.frequency.exponentialRampToValueAtTime(60, now + 0.2);
                gain.gain.setValueAtTime(0.25 * AUDIO_CONFIG.sfxVolume, now);
                gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
                osc.start(now);
                osc.stop(now + 0.21);
                break;

            case 'levelWin':
                // Fanfarria patriótica breve al completar nivel
                this.playFanfare();
                break;

            case 'gameOver':
                // Tono descendente solemne
                osc.type = 'sawtooth';
                osc.frequency.setValueAtTime(220, now);
                osc.frequency.linearRampToValueAtTime(80, now + 0.5);
                gain.gain.setValueAtTime(0.25 * AUDIO_CONFIG.sfxVolume, now);
                gain.gain.linearRampToValueAtTime(0.01, now + 0.5);
                osc.start(now);
                osc.stop(now + 0.52);
                break;

            case 'dialogueNext':
                // Clic suave de avance en diálogo histórico
                osc.type = 'sine';
                osc.frequency.setValueAtTime(440, now);
                gain.gain.setValueAtTime(0.12 * AUDIO_CONFIG.sfxVolume, now);
                gain.gain.exponentialRampToValueAtTime(0.01, now + 0.05);
                osc.start(now);
                osc.stop(now + 0.06);
                break;

            default:
                break;
        }
    }

    /**
     * Fanfarria sintética de victoria de nivel
     */
    playFanfare() {
        if (!this.ctx) return;
        const notes = [440, 554.37, 659.25, 880]; // La, Do#, Mi, La
        notes.forEach((freq, idx) => {
            const now = this.ctx.currentTime + idx * 0.12;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(freq, now);
            gain.gain.setValueAtTime(0.2 * AUDIO_CONFIG.sfxVolume, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);
            osc.start(now);
            osc.stop(now + 0.26);
        });
    }

    /**
     * Control de Música de Fondo
     */
    playMusic(bgmKey) {
        if (!this.musicEnabled) return;
        this.stopMusic();

        if (this.audioElements[bgmKey]) {
            try {
                this.currentMusic = this.audioElements[bgmKey];
                this.currentMusic.loop = true;
                this.currentMusic.volume = AUDIO_CONFIG.musicVolume;
                this.currentMusic.play().catch(() => {});
            } catch (e) {}
        }
    }

    stopMusic() {
        if (this.currentMusic) {
            this.currentMusic.pause();
            this.currentMusic.currentTime = 0;
            this.currentMusic = null;
        }
    }

    toggleSound() {
        this.enabled = !this.enabled;
        if (!this.enabled) {
            this.stopBattleMusic();
            this.stopMusic();
        }
        return this.enabled;
    }

    toggleMusic() {
        this.musicEnabled = !this.musicEnabled;
        if (!this.musicEnabled) {
            this.stopMusic();
        }
        return this.musicEnabled;
    }

    /**
     * Soundtrack procedural de batalla por nivel histórico
     * Genera música única para cada uno de los 6 niveles de la Gesta de Sandino
     */
    playBattleMusic(levelIndex) {
        this.stopBattleMusic();
        if (!this.musicEnabled) return;
        this.ensureActive();
        if (!this.ctx) return;

        // Patrones de notas por nivel (frecuencias Hz) + BPM + carácter
        const levelMusic = [
            // Nivel 1: Niquinohomo - Tensión guerrillera campesina
            {
                bpm: 78,
                notes: [196, 220, 246, 220, 196, 174, 196, 220],
                bassNotes: [98, 110, 98, 87],
                waveType: 'triangle',
                bassWave: 'sawtooth',
                color: 'warm',
                volume: 0.08
            },
            // Nivel 2: San Albino - Marcha rebelde combativa
            {
                bpm: 110,
                notes: [293, 329, 369, 329, 293, 261, 293, 329],
                bassNotes: [146, 130, 146, 116],
                waveType: 'square',
                bassWave: 'sawtooth',
                color: 'march',
                volume: 0.09
            },
            // Nivel 3: El Chipote - Batalla aérea, tensión dramática
            {
                bpm: 130,
                notes: [233, 261, 293, 261, 233, 207, 185, 207],
                bassNotes: [116, 130, 116, 103],
                waveType: 'sawtooth',
                bassWave: 'square',
                color: 'battle',
                volume: 0.10
            },
            // Nivel 4: Retirada Marines - Marcha triunfal soberana
            {
                bpm: 95,
                notes: [349, 392, 440, 392, 349, 329, 349, 392],
                bassNotes: [174, 196, 174, 164],
                waveType: 'triangle',
                bassWave: 'triangle',
                color: 'victory',
                volume: 0.09
            },
            // Nivel 5: Wiwilí - Campo tranquilo, cooperativa, esperanza
            {
                bpm: 68,
                notes: [329, 370, 415, 370, 329, 293, 329, 370],
                bassNotes: [164, 185, 164, 146],
                waveType: 'sine',
                bassWave: 'triangle',
                color: 'peaceful',
                volume: 0.07
            },
            // Nivel 6: Managua/Tiscapa - Drama oscuro, jefe final, épico
            {
                bpm: 118,
                notes: [220, 246, 261, 246, 220, 196, 174, 196],
                bassNotes: [110, 98, 87, 98],
                waveType: 'sawtooth',
                bassWave: 'square',
                color: 'dark',
                volume: 0.11
            }
        ];

        const lvlMusic = levelMusic[Math.min(levelIndex, levelMusic.length - 1)];
        const beatDuration = 60 / lvlMusic.bpm;
        const noteLen = beatDuration * 0.85;
        const vol = lvlMusic.volume * AUDIO_CONFIG.musicVolume * (this.enabled ? 1 : 0);

        // Función para programar una nota
        const scheduleNote = (freq, startTime, duration, waveType, gainVal, detune = 0) => {
            if (!this.ctx) return;
            const osc = this.ctx.createOscillator();
            const gainNode = this.ctx.createGain();
            const filter = this.ctx.createBiquadFilter();

            osc.type = waveType;
            osc.frequency.setValueAtTime(freq, startTime);
            osc.detune.setValueAtTime(detune, startTime);
            filter.type = 'lowpass';
            filter.frequency.setValueAtTime(lvlMusic.color === 'battle' ? 2200 : 1400, startTime);

            osc.connect(filter);
            filter.connect(gainNode);
            gainNode.connect(this.ctx.destination);

            gainNode.gain.setValueAtTime(0, startTime);
            gainNode.gain.linearRampToValueAtTime(gainVal, startTime + 0.02);
            gainNode.gain.setValueAtTime(gainVal, startTime + duration * 0.7);
            gainNode.gain.linearRampToValueAtTime(0, startTime + duration);

            osc.start(startTime);
            osc.stop(startTime + duration + 0.05);
        };

        // Programar 2 compases completos y repetirlos con setInterval
        const loopBars = 2;
        const totalNotes = lvlMusic.notes.length;
        const barDuration = totalNotes * beatDuration * loopBars;

        const playBar = (startOffset) => {
            if (!this.ctx || !this.battleMusicActive) return;
            const now = this.ctx.currentTime + startOffset;

            // Melodía principal
            for (let n = 0; n < totalNotes; n++) {
                const t = now + n * beatDuration;
                scheduleNote(lvlMusic.notes[n], t, noteLen, lvlMusic.waveType, vol);
                // Armonía a una 5a justa
                if (lvlMusic.color !== 'peaceful') {
                    scheduleNote(lvlMusic.notes[n] * 1.5, t, noteLen * 0.8, lvlMusic.waveType, vol * 0.35, -8);
                }
            }

            // Bajo (mitad de velocidad)
            const bassNotes = lvlMusic.bassNotes;
            for (let b = 0; b < bassNotes.length; b++) {
                const t = now + b * beatDuration * 2;
                scheduleNote(bassNotes[b], t, beatDuration * 1.7, lvlMusic.bassWave, vol * 0.55);
            }

            // Percusión rítmica sintética (ruido filtrado como tambor)
            for (let d = 0; d < totalNotes; d++) {
                if (d % 2 === 0) {
                    const t = now + d * beatDuration;
                    const noise = this.ctx.createOscillator();
                    const noiseGain = this.ctx.createGain();
                    const noiseFilter = this.ctx.createBiquadFilter();
                    noise.type = 'sawtooth';
                    noise.frequency.setValueAtTime(55, t);
                    noise.frequency.exponentialRampToValueAtTime(25, t + 0.08);
                    noiseFilter.type = 'bandpass';
                    noiseFilter.frequency.setValueAtTime(120, t);
                    noise.connect(noiseFilter);
                    noiseFilter.connect(noiseGain);
                    noiseGain.connect(this.ctx.destination);
                    noiseGain.gain.setValueAtTime(vol * 0.4, t);
                    noiseGain.gain.exponentialRampToValueAtTime(0.001, t + 0.1);
                    noise.start(t);
                    noise.stop(t + 0.12);
                }
            }
        };

        this.battleMusicActive = true;
        playBar(0.1);

        // Repetir en bucle
        this._battleMusicInterval = setInterval(() => {
            if (!this.ctx || !this.battleMusicActive) {
                clearInterval(this._battleMusicInterval);
                return;
            }
            playBar(0.05);
        }, barDuration * 1000);
    }

    stopBattleMusic() {
        this.battleMusicActive = false;
        if (this._battleMusicInterval) {
            clearInterval(this._battleMusicInterval);
            this._battleMusicInterval = null;
        }
    }
}

// Instancia global disponible en el juego
window.soundManager = new SoundManager();
