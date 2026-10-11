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
        attack: "",        // Ejemplo: "sounds/disparo.mp3" o "sounds/accion.mp3"
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
                // Sonido de disparo o emboscada guerrillera
                osc.type = 'sawtooth';
                osc.frequency.setValueAtTime(520, now);
                osc.frequency.exponentialRampToValueAtTime(80, now + 0.16);
                gain.gain.setValueAtTime(0.2 * AUDIO_CONFIG.sfxVolume, now);
                gain.gain.exponentialRampToValueAtTime(0.01, now + 0.16);
                osc.start(now);
                osc.stop(now + 0.17);
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
        return this.enabled;
    }

    toggleMusic() {
        this.musicEnabled = !this.musicEnabled;
        if (!this.musicEnabled) {
            this.stopMusic();
        }
        return this.musicEnabled;
    }
}

// Instancia global disponible en el juego
window.soundManager = new SoundManager();
