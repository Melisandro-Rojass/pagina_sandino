/**
 * ==============================================================================
 *  game.js - MOTOR DEL JUEGO EDUCATIVO "LA GESTA DE SANDINO"
 * ==============================================================================
 *  Un videojuego histórico progresivo a través de los 6 hitos cruciales de la vida
 *  del General Augusto C. Sandino (1895 - 1934).
 * ==============================================================================
 */

(function () {
    'use strict';

    // =========================================================================
    // 1. DATOS HISTÓRICOS Y NIVELES EDUCATIVOS
    // =========================================================================
    const HISTORICAL_LEVELS = [
        {
            id: 1,
            title: "Nivel 1: Niquinohomo y el Despertar",
            period: "1895 – 1926",
            location: "Niquinohomo y el Campo Nicaragüense",
            introText: "Augusto Nicolás Calderón Sandino nació en Niquinohomo en 1895. De origen campesino humilde, experimentó de cerca el trabajo forzado en el campo y la desigualdad social. Tras viajar por México y Centroamérica conociendo las luchas obreras e indigenistas, regresó a Nicaragua decidido a luchar por la dignidad de su pueblo frente a la intervención extranjera.",
            missionObjective: "Recorre los caminos de Niquinohomo, recolecta 3 Manifiestos de Justicia Social y esquiva las patrullas interventoras.",
            victoryText: "¡Has despertado la conciencia de Niquinohomo! Sandino parte hacia el norte de Nicaragua para organizar a los trabajadores.",
            quote: "“Soy nicaragüense y me siento orgulloso de que en mis venas circule la sangre india americana”.",
            targetScore: 3,
            bgColor: "#1a1e28",
            groundColor: "#42281a",
            skyGradient: ["#1e293b", "#0f172a"],
            enemyName: "Vigilante Interventor",
            enemySpeed: 1.2,
            hasBiplanes: false
        },
        {
            id: 2,
            title: "Nivel 2: San Albino y el Rechazo al Espino Negro",
            period: "Mayo de 1927",
            location: "Minas de San Albino, Nueva Segovia",
            introText: "En las minas de oro de San Albino, Sandino organizó a los mineros. Cuando los caudillos tradicionales firmaron el vergonzoso Pacto del Espino Negro aceptando desarmarse ante las tropas de EE.UU., Sandino fue el ÚNICO general que se negó a rendirse: 'Yo no me vendo ni me rindo; aquí no se rinde nadie'.",
            missionObjective: "En la mina de San Albino, reúne las 3 Banderas Rojas y Negras del EDSNN y rechaza las órdenes de rendición.",
            victoryText: "¡Has fundado el Ejército Defensor de la Soberanía Nacional! La resistencia armada ha comenzado oficialmente.",
            quote: "“Mi espada empuñada defenderá el decoro nacional y dará la redención a los oprimidos”.",
            targetScore: 3,
            bgColor: "#261a18",
            groundColor: "#33221e",
            skyGradient: ["#3b1f1a", "#1a0f0d"],
            enemyName: "Oficial Desarmador",
            enemySpeed: 1.5,
            hasBiplanes: false
        },
        {
            id: 3,
            title: "Nivel 3: El Chipote y la Guerra de Las Segovias",
            period: "1927 – 1930",
            location: "Montañas de Las Segovias y Cuartel El Chipote",
            introText: "Sandino estableció su cuartel rebelde en la agreste cima de El Chipote. El ejército estadounidense envió cientos de Marines y utilizó aviación militar por primera vez en Centroamérica. Sandino desarrolló con genialidad la guerra de guerrillas: ataques sorpresa, conocimiento del terreno y repliegues tácticos.",
            missionObjective: "Avanza por la selva de Las Segovias, esquiva las bombas de los biplanos extranjeros y recolecta 4 banderas de soberanía.",
            victoryText: "¡Las tácticas guerrilleras frustraron a las tropas extranjeras! Las Segovias permanecen invictas bajo el mando de Sandino.",
            quote: "“La soberanía de un pueblo no se discute, se defiende con las armas en la mano”.",
            targetScore: 4,
            bgColor: "#13231a",
            groundColor: "#1d3826",
            skyGradient: ["#0f281e", "#07130e"],
            enemyName: "Patrulla de Marines",
            enemySpeed: 1.8,
            hasBiplanes: true
        },
        {
            id: 4,
            title: "Nivel 4: La Retirada de las Tropas Extranjeras",
            period: "Enero de 1933",
            location: "Caminos Soberanos de Nicaragua",
            introText: "Tras seis años de resistencia heroica que desgastó a las fuerzas extranjeras y conmovió a la opinión pública mundial, el 1 de enero de 1933 las últimas tropas de los Marines abandonaron el territorio nicaragüense. Fue una histórica victoria militar y moral de la patria.",
            missionObjective: "Recupera 4 Banderas Nacionales de Nicaragua y acompaña la victoria de la autodeterminación.",
            victoryText: "¡Nicaragua es libre de tropas extranjeras! La causa de Sandino logró la expulsión del invasor.",
            quote: "“Los Estados Unidos no pudieron vencer al pequeño ejército de campesinos patriotas”.",
            targetScore: 4,
            bgColor: "#141c2c",
            groundColor: "#1e293b",
            skyGradient: ["#0284c7", "#0c4a6e"],
            enemyName: "Último Destacamento",
            enemySpeed: 2.0,
            hasBiplanes: false
        },
        {
            id: 5,
            title: "Nivel 5: Las Cooperativas de Wiwilí y el Río Coco",
            period: "1933 – 1934",
            location: "Río Coco, Wiwilí",
            introText: "Demostrando que su lucha nunca fue por dinero ni cargos públicos, Sandino aceptó firmar la paz con el presidente Sacasa. Se trasladó al río Coco en Wiwilí para fundar cooperativas agrícolas comunales, donde sus excombatientes y campesinos sembraban la tierra colectivamente en dignidad y paz.",
            missionObjective: "Recolecta 4 Herramientas de Labranza y Semillas para consolidar la cooperativa agrícola del río Coco.",
            victoryText: "¡La cooperativa campesina florece! Sandino demostró su inmenso amor por la justicia social de su pueblo.",
            quote: "“Todos los campesinos debemos estar unidos en el trabajo de la tierra libre”.",
            targetScore: 4,
            bgColor: "#1a2418",
            groundColor: "#2e3b22",
            skyGradient: ["#15803d", "#14532d"],
            enemyName: "Saboteador Feudal",
            enemySpeed: 1.6,
            hasBiplanes: false
        },
        {
            id: 6,
            title: "Nivel 6: La Noche de Managua y la Inmortalidad",
            period: "21 de Febrero de 1934",
            location: "Managua, Loma de Tiscapa",
            introText: "Tras asistir a una cena de reconciliación en la Casa Presidencial de Managua, Sandino fue emboscado a traición por órdenes del jefe de la Guardia Nacional, Anastasio Somoza García. Sandino fue martirizado esa noche, pero su muerte lo transformó para siempre en el símbolo inmortal de la soberanía nicaragüense.",
            missionObjective: "Avanza por la noche histórica de Managua, elude la conspiración y alcanza el pedestal de la Inmortalidad Histórica.",
            victoryText: "¡Sandino ha trascendido a la eternidad! El General de Hombres Libres vive en el corazón soberano de Nicaragua.",
            quote: "“El hombre que de su patria no exige un palmo de tierra para su sepultura, merece ser oído, y no sólo ser oído sino creído”.",
            targetScore: 5,
            bgColor: "#111118",
            groundColor: "#1f1d2b",
            skyGradient: ["#312e81", "#0f0e17"],
            enemyName: "Guardia Traidora",
            enemySpeed: 2.2,
            hasBiplanes: false
        }
    ];

    // =========================================================================
    // 2. CONFIGURACIÓN DEL CANVAS Y ESTADO DEL JUEGO
    // =========================================================================
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');

    const GAME_STATE = {
        START: 'start',
        DIALOGUE: 'dialogue',
        PLAYING: 'playing',
        LEVEL_WIN: 'level_win',
        GAME_OVER: 'game_over',
        VICTORY: 'victory'
    };

    let currentState = GAME_STATE.START;
    let currentLevelIndex = 0;
    let score = 0;
    let lives = 3;
    let gameLoopId = null;

    // Teclas presionadas
    const keys = {
        left: false,
        right: false,
        up: false,
        action: false
    };

    // =========================================================================
    // 3. JUGADOR (SANDINO) Y OBJETOS DEL MUNDO
    // =========================================================================
    const player = {
        x: 80,
        y: 380,
        width: 36,
        height: 58,
        vx: 0,
        vy: 0,
        speed: 4.2,
        jumpPower: -12.5,
        onGround: false,
        facing: 'right',
        invulnerable: 0,
        stealthMode: false,
        frame: 0,
        // Arma de Sandino
        attacking: false,
        attackTimer: 0,
        attackRange: 90,
        attackCooldown: 0
    };

    let platforms = [];
    let items = [];
    let enemies = [];
    let bombs = [];
    let particles = [];

    // =========================================================================
    // 4. INICIALIZACIÓN DE NIVELES
    // =========================================================================
    function setupLevel(index) {
        currentLevelIndex = index;
        const lvl = HISTORICAL_LEVELS[currentLevelIndex];
        score = 0;

        // Resetear posición de Sandino
        player.x = 80;
        player.y = 380;
        player.vx = 0;
        player.vy = 0;
        player.invulnerable = 60;
        player.attacking = false;
        player.attackTimer = 0;
        player.attackCooldown = 0;

        // Construcción de plataformas para el mapa grande (1200x520)
        platforms = [
            // Suelo principal
            { x: 0, y: 480, width: 1200, height: 40 },
            // Plataformas flotantes tácticas - primera mitad
            { x: 120, y: 380, width: 130, height: 16 },
            { x: 320, y: 310, width: 150, height: 16 },
            { x: 530, y: 260, width: 140, height: 16 },
            // Plataformas flotantes - segunda mitad
            { x: 720, y: 340, width: 130, height: 16 },
            { x: 900, y: 270, width: 160, height: 16 },
            { x: 1050, y: 200, width: 120, height: 16 },
            // Plataformas intermedias extra
            { x: 200, y: 200, width: 110, height: 16 },
            { x: 650, y: 160, width: 130, height: 16 },
            { x: 450, y: 400, width: 100, height: 16 }
        ];

        // Objetos a recolectar (Manifiestos / Banderas / Herramientas)
        items = [];
        const itemPositions = [
            { x: 170, y: 340 },
            { x: 380, y: 270 },
            { x: 570, y: 220 },
            { x: 760, y: 300 },
            { x: 960, y: 230 },
            { x: 1080, y: 160 },
            { x: 240, y: 160 },
            { x: 690, y: 120 }
        ];

        for (let i = 0; i < lvl.targetScore; i++) {
            const pos = itemPositions[i % itemPositions.length];
            items.push({
                x: pos.x,
                y: pos.y,
                width: 24,
                height: 28,
                collected: false,
                floatOffset: Math.random() * Math.PI * 2
            });
        }

        // Enemigos históricos acordes a la época (más espacio = más enemigos)
        enemies = [];
        const enemyCount = index >= 2 ? 4 : 3;
        const enemySpawns = [
            { x: 300, y: 440, minX: 220, maxX: 480 },
            { x: 650, y: 440, minX: 550, maxX: 800 },
            { x: 950, y: 440, minX: 850, maxX: 1100 },
            { x: 560, y: 220, minX: 530, maxX: 660 },
            { x: 920, y: 230, minX: 900, maxX: 1050 }
        ];

        for (let i = 0; i < enemyCount; i++) {
            const spawn = enemySpawns[i];
            enemies.push({
                x: spawn.x,
                y: spawn.y,
                width: 30,
                height: 52,
                vx: lvl.enemySpeed * (i % 2 === 0 ? 1 : -1),
                minX: spawn.minX,
                maxX: spawn.maxX,
                defeated: false
            });
        }

        // Bombas de biplanos para el Nivel de El Chipote
        bombs = [];

        // Iniciar diálogo introductorio del nivel
        showLevelModal(lvl);
    }

    // =========================================================================
    // 5. MOTOR DE FÍSICA Y COLISIONES
    // =========================================================================
    function updatePhysics() {
        if (currentState !== GAME_STATE.PLAYING) return;

        // Movimiento horizontal de Sandino
        if (keys.left) {
            player.vx = -player.speed;
            player.facing = 'left';
            player.frame += 0.2;
        } else if (keys.right) {
            player.vx = player.speed;
            player.facing = 'right';
            player.frame += 0.2;
        } else {
            player.vx *= 0.6; // Desaceleración suave
        }

        // Salto
        if (keys.up && player.onGround) {
            player.vy = player.jumpPower;
            player.onGround = false;
            window.soundManager.play('jump');
        }

        // Gravedad
        player.vy += 0.55;
        if (player.vy > 12) player.vy = 12;

        player.x += player.vx;
        player.y += player.vy;

        // Límites del canvas más grande (1200x520)
        if (player.x < 10) player.x = 10;
        if (player.x > canvas.width - player.width - 10) player.x = canvas.width - player.width - 10;

        // Colisión con plataformas
        player.onGround = false;
        platforms.forEach(p => {
            if (
                player.x + player.width > p.x &&
                player.x < p.x + p.width &&
                player.y + player.height >= p.y &&
                player.y + player.height <= p.y + p.height + player.vy + 2 &&
                player.vy >= 0
            ) {
                player.y = p.y - player.height;
                player.vy = 0;
                player.onGround = true;
            }
        });

        // Invulnerabilidad temporal
        if (player.invulnerable > 0) {
            player.invulnerable--;
        }

        // Timer del ataque con arma
        if (player.attackTimer > 0) {
            player.attackTimer--;
            if (player.attackTimer === 0) {
                player.attacking = false;
            }
        }
        if (player.attackCooldown > 0) {
            player.attackCooldown--;
        }

        // Actualizar Objetos
        items.forEach(item => {
            if (!item.collected) {
                item.floatOffset += 0.06;
                // Colisión jugador con objeto
                if (
                    player.x < item.x + item.width &&
                    player.x + player.width > item.x &&
                    player.y < item.y + item.height &&
                    player.y + player.height > item.y
                ) {
                    item.collected = true;
                    score++;
                    window.soundManager.play('itemCollect');
                    createCollectParticles(item.x + 10, item.y + 10);
                    updateHUD();

                    const currentLvl = HISTORICAL_LEVELS[currentLevelIndex];
                    if (score >= currentLvl.targetScore) {
                        triggerLevelWin();
                    }
                }
            }
        });

        // Actualizar Enemigos
        enemies.forEach(enemy => {
            if (enemy.defeated) return;

            enemy.x += enemy.vx;
            if (enemy.x <= enemy.minX || enemy.x >= enemy.maxX) {
                enemy.vx *= -1;
            }

            // Colisión con Sandino
            if (
                player.invulnerable === 0 &&
                player.x < enemy.x + enemy.width &&
                player.x + player.width > enemy.x &&
                player.y < enemy.y + enemy.height &&
                player.y + player.height > enemy.y
            ) {
                // Si Sandino cae sobre el enemigo (salto táctico)
                if (player.vy > 1 && player.y + player.height < enemy.y + 24) {
                    enemy.defeated = true;
                    player.vy = -7;
                    window.soundManager.play('enemyDefeat');
                    createCollectParticles(enemy.x + 14, enemy.y + 10, '#c69214');
                } else {
                    // Daño recibido
                    lives--;
                    player.invulnerable = 60;
                    player.vy = -6;
                    player.vx = player.facing === 'right' ? -5 : 5;
                    window.soundManager.play('playerHit');
                    updateHUD();

                    if (lives <= 0) {
                        triggerGameOver();
                    }
                }
            }
        });

        // Ataque con arma de Sandino (Machete / Rifle)
        if (keys.action && player.attackCooldown === 0) {
            player.attacking = true;
            player.attackTimer = 15; // duración visual del ataque
            player.attackCooldown = 25; // cooldown entre ataques
            window.soundManager.play('attack');

            // Detectar enemigos en rango del arma
            const attackX = player.facing === 'right'
                ? player.x + player.width
                : player.x - player.attackRange;
            const attackW = player.attackRange;
            const attackY = player.y + 5;
            const attackH = player.height - 10;

            enemies.forEach(enemy => {
                if (!enemy.defeated &&
                    attackX < enemy.x + enemy.width &&
                    attackX + attackW > enemy.x &&
                    attackY < enemy.y + enemy.height &&
                    attackY + attackH > enemy.y
                ) {
                    enemy.defeated = true;
                    createCollectParticles(enemy.x + 14, enemy.y + 20, '#8b1e1e');
                }
            });

            keys.action = false;
        }

        // Bombas de biplanos (solo en Nivel 3)
        const lvl = HISTORICAL_LEVELS[currentLevelIndex];
        if (lvl.hasBiplanes) {
            if (Math.random() < 0.015 && bombs.length < 4) {
                bombs.push({
                    x: Math.random() * (canvas.width - 60) + 30,
                    y: 10,
                    vy: 3.2,
                    exploded: false
                });
            }

            bombs.forEach((bomb, bIdx) => {
                bomb.y += bomb.vy;

                // Impacto con el suelo
                if (bomb.y >= 470) {
                    bomb.exploded = true;
                    createCollectParticles(bomb.x, bomb.y, '#e53e3e');
                }

                // Daño al jugador
                if (
                    !bomb.exploded &&
                    player.invulnerable === 0 &&
                    Math.hypot(player.x + 16 - bomb.x, player.y + 27 - bomb.y) < 26
                ) {
                    lives--;
                    player.invulnerable = 60;
                    bomb.exploded = true;
                    window.soundManager.play('playerHit');
                    updateHUD();
                    if (lives <= 0) triggerGameOver();
                }
            });

            bombs = bombs.filter(b => !b.exploded);
        }

        // Actualizar partículas
        particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            p.alpha -= 0.03;
        });
        particles = particles.filter(p => p.alpha > 0);
    }

    function createCollectParticles(x, y, color = '#f4c430') {
        for (let i = 0; i < 10; i++) {
            particles.push({
                x,
                y,
                vx: (Math.random() - 0.5) * 5,
                vy: (Math.random() - 0.5) * 5,
                color,
                size: Math.random() * 4 + 2,
                alpha: 1.0
            });
        }
    }

    // =========================================================================
    // 6. RENDERIZADO VISUAL DEL JUEGO
    // =========================================================================
    function draw() {
        const lvl = HISTORICAL_LEVELS[currentLevelIndex];

        // 1. Cielo y degradado de fondo
        const skyGrad = ctx.createLinearGradient(0, 0, 0, canvas.height);
        skyGrad.addColorStop(0, lvl.skyGradient[0]);
        skyGrad.addColorStop(1, lvl.skyGradient[1]);
        ctx.fillStyle = skyGrad;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // 2. Siluetas de fondo (Montañas de Las Segovias / Casas históricas)
        drawParallaxBackground(lvl);

        // 3. Plataformas del terreno
        platforms.forEach(p => {
            // Capa superior con tierra o roca
            ctx.fillStyle = lvl.groundColor;
            ctx.fillRect(p.x, p.y, p.width, p.height);

            // Borde superior decorativo
            ctx.fillStyle = '#004b87'; // Toque azul patrio en bordes
            ctx.fillRect(p.x, p.y, p.width, 3);
        });

        // 4. Dibujar Objetos Coleccionables (Manifiestos / Banderas)
        items.forEach(item => {
            if (!item.collected) {
                const floatY = item.y + Math.sin(item.floatOffset) * 4;
                drawItem(item.x, floatY, currentLevelIndex);
            }
        });

        // 5. Dibujar Enemigos de la época
        enemies.forEach(enemy => {
            if (!enemy.defeated) {
                drawEnemy(enemy, currentLevelIndex);
            }
        });

        // 6. Dibujar Bombas (en nivel de biplanos)
        bombs.forEach(b => {
            ctx.fillStyle = '#1e293b';
            ctx.beginPath();
            ctx.arc(b.x, b.y, 6, 0, Math.PI * 2);
            ctx.fill();
            // Aleta de bomba
            ctx.fillStyle = '#e11d48';
            ctx.fillRect(b.x - 2, b.y - 10, 4, 6);
        });

        // 7. Dibujar a Sandino (Personaje principal)
        drawSandino();

        // 8. Dibujar Partículas
        particles.forEach(p => {
            ctx.save();
            ctx.globalAlpha = p.alpha;
            ctx.fillStyle = p.color;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        });
    }

    /**
     * Dibuja los fondos según el escenario histórico del nivel
     */
    function drawParallaxBackground(lvl) {
        ctx.save();
        ctx.fillStyle = "rgba(0, 0, 0, 0.25)";

        // Montañas lejanas (ajustadas al canvas 1200x520)
        ctx.beginPath();
        ctx.moveTo(0, 480);
        ctx.lineTo(100, 340);
        ctx.lineTo(220, 400);
        ctx.lineTo(380, 280);
        ctx.lineTo(520, 370);
        ctx.lineTo(680, 250);
        ctx.lineTo(850, 350);
        ctx.lineTo(1000, 300);
        ctx.lineTo(1120, 380);
        ctx.lineTo(1200, 480);
        ctx.closePath();
        ctx.fill();

        // Montañas cercanas (capa adicional de profundidad)
        ctx.fillStyle = "rgba(0, 0, 0, 0.15)";
        ctx.beginPath();
        ctx.moveTo(0, 480);
        ctx.lineTo(150, 390);
        ctx.lineTo(300, 430);
        ctx.lineTo(500, 360);
        ctx.lineTo(700, 410);
        ctx.lineTo(900, 340);
        ctx.lineTo(1050, 400);
        ctx.lineTo(1200, 480);
        ctx.closePath();
        ctx.fill();

        // Si es el nivel de El Chipote, dibujar biplano lejano
        if (lvl.hasBiplanes) {
            ctx.fillStyle = "#334155";
            ctx.fillRect(200 + (Date.now() / 30) % 800, 60, 40, 12);
            ctx.fillRect(215 + (Date.now() / 30) % 800, 50, 14, 28);
        }

        ctx.restore();
    }

    /**
     * Dibuja a Augusto C. Sandino con su indumentaria icónica
     */
    function drawSandino() {
        // Parpadeo suave si es invulnerable
        if (player.invulnerable > 0 && Math.floor(player.invulnerable / 5) % 2 === 0) {
            return;
        }

        ctx.save();
        const px = player.x;
        const py = player.y;

        // Invertir si mira a la izquierda
        if (player.facing === 'left') {
            ctx.translate(px + player.width, py);
            ctx.scale(-1, 1);
        } else {
            ctx.translate(px, py);
        }

        // --- ARMA: MACHETE / RIFLE DE SANDINO ---
        if (player.attacking && player.attackTimer > 0) {
            // Swing de machete animado
            ctx.save();
            const swingProgress = 1 - (player.attackTimer / 15);
            const swingAngle = -Math.PI / 3 + (swingProgress * Math.PI * 0.8);
            ctx.translate(26, 28);
            ctx.rotate(swingAngle);

            // Hoja del machete
            ctx.fillStyle = "#c0c0c0";
            ctx.beginPath();
            ctx.moveTo(0, -3);
            ctx.lineTo(45, -5);
            ctx.lineTo(48, 0);
            ctx.lineTo(45, 5);
            ctx.lineTo(0, 3);
            ctx.closePath();
            ctx.fill();
            ctx.strokeStyle = "#e8e8e8";
            ctx.lineWidth = 1;
            ctx.stroke();

            // Filo brillante
            ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
            ctx.fillRect(10, -2, 30, 1);

            // Mango del machete
            ctx.fillStyle = "#5c3c1e";
            ctx.fillRect(-8, -4, 10, 8);
            ctx.fillStyle = "#78350f";
            ctx.fillRect(-6, -3, 6, 6);

            // Estela del ataque (efecto visual)
            ctx.globalAlpha = 0.3 * (1 - swingProgress);
            ctx.strokeStyle = "#ffffff";
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(0, 0, 42, -0.5, 0.5);
            ctx.stroke();
            ctx.globalAlpha = 1;

            ctx.restore();
        } else {
            // Arma en posición de reposo (rifle en la espalda)
            ctx.save();
            ctx.translate(20, 15);
            ctx.rotate(Math.PI / 6);

            // Cañón del rifle
            ctx.fillStyle = "#4a4a52";
            ctx.fillRect(0, -2, 32, 4);

            // Culata de madera
            ctx.fillStyle = "#5c3c1e";
            ctx.fillRect(-10, -4, 12, 8);
            ctx.fillStyle = "#78350f";
            ctx.fillRect(-8, -3, 8, 6);

            ctx.restore();
        }

        // --- 1. SOMBRERO ALÓN CARACTERÍSTICO DE SANDINO ---
        ctx.fillStyle = "#fef08a"; // Color paja / cuero claro
        // Ala ancha del sombrero
        ctx.beginPath();
        ctx.ellipse(18, 8, 22, 6, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = "#854d0e";
        ctx.stroke();

        // Copa alta del sombrero
        ctx.fillRect(10, -10, 16, 18);

        // Cinta roja y negra en el sombrero
        ctx.fillStyle = "#8b1e1e";
        ctx.fillRect(10, 3, 8, 4);
        ctx.fillStyle = "#111116";
        ctx.fillRect(18, 3, 8, 4);

        // --- 2. CABEZA / ROSTRO ---
        ctx.fillStyle = "#d4a373"; // Tono de piel
        ctx.fillRect(12, 8, 12, 12);

        // Ojos y bigote fino característico
        ctx.fillStyle = "#26130b";
        ctx.fillRect(19, 12, 2, 2);
        ctx.fillRect(15, 16, 7, 2); // Bigote de Sandino

        // --- 3. PAÑUELO ROJO Y NEGRO AL CUELLO ---
        ctx.fillStyle = "#8b1e1e";
        ctx.beginPath();
        ctx.moveTo(12, 20);
        ctx.lineTo(24, 20);
        ctx.lineTo(18, 28);
        ctx.closePath();
        ctx.fill();

        // --- 4. CAMISA Y CHAQUETA DE CAMPAÑA (VERDE OLIVA / CAQUI) ---
        ctx.fillStyle = "#4d5b40";
        ctx.fillRect(10, 23, 16, 20);

        // Cartuchera cruzada en el pecho
        ctx.strokeStyle = "#78350f";
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.moveTo(10, 24);
        ctx.lineTo(26, 42);
        ctx.stroke();

        // Cartuchera en diagonal opuesta
        ctx.beginPath();
        ctx.moveTo(26, 24);
        ctx.lineTo(10, 42);
        ctx.stroke();

        // --- 5. PANTALÓN Y BOTAS DE MONTAR ---
        ctx.fillStyle = "#2d3326";
        ctx.fillRect(11, 43, 6, 12);
        ctx.fillRect(19, 43, 6, 12);

        // Botas de cuero altas
        ctx.fillStyle = "#451a03";
        ctx.fillRect(10, 50, 7, 8);
        ctx.fillRect(19, 50, 7, 8);

        ctx.restore();
    }

    /**
     * Dibuja a los enemigos históricos según el nivel
     */
    function drawEnemy(enemy, lvlIndex) {
        ctx.save();
        const ex = enemy.x;
        const ey = enemy.y;

        if (lvlIndex === 2) {
            // Marine estadounidense (uniforme caqui, casco redondo de acero)
            ctx.fillStyle = "#94a3b8"; // Casco de plato
            ctx.beginPath();
            ctx.arc(ex + 14, ey + 8, 10, Math.PI, Math.PI * 2);
            ctx.fill();

            ctx.fillStyle = "#e2e8f0";
            ctx.fillRect(ex + 9, ey + 8, 10, 8); // Rostro

            ctx.fillStyle = "#713f12"; // Uniforme caqui
            ctx.fillRect(ex + 7, ey + 16, 14, 18);
            ctx.fillStyle = "#334155"; // Pantalón
            ctx.fillRect(ex + 8, ey + 34, 12, 14);
        } else if (lvlIndex === 5) {
            // Guardia Nacional traidora de Managua (uniforme oscuro)
            ctx.fillStyle = "#1e293b";
            ctx.fillRect(ex + 7, ey + 4, 14, 10);
            ctx.fillStyle = "#0f172a";
            ctx.fillRect(ex + 6, ey + 14, 16, 20);
            ctx.fillStyle = "#1e1b4b";
            ctx.fillRect(ex + 7, ey + 34, 14, 14);
        } else {
            // Guardias de ocupación / Emisarios
            ctx.fillStyle = "#475569";
            ctx.fillRect(ex + 8, ey + 6, 12, 10);
            ctx.fillStyle = "#334155";
            ctx.fillRect(ex + 6, ey + 16, 16, 18);
            ctx.fillStyle = "#1e293b";
            ctx.fillRect(ex + 7, ey + 34, 14, 14);
        }

        ctx.restore();
    }

    /**
     * Dibuja los objetos históricos (Manifiesto, Bandera EDSNN, Herramienta)
     */
    function drawItem(x, y, lvlIndex) {
        ctx.save();
        if (lvlIndex === 0) {
            // Manifiesto de Niquinohomo (pergamino con sello)
            ctx.fillStyle = "#fef3c7";
            ctx.fillRect(x, y, 18, 22);
            ctx.strokeStyle = "#b45309";
            ctx.strokeRect(x, y, 18, 22);
            ctx.fillStyle = "#b45309";
            ctx.fillRect(x + 3, y + 5, 12, 2);
            ctx.fillRect(x + 3, y + 10, 12, 2);
            ctx.fillRect(x + 3, y + 15, 8, 2);
        } else if (lvlIndex === 4) {
            // Herramienta de cooperativa de Wiwilí (espiga / azadón)
            ctx.fillStyle = "#eab308";
            ctx.beginPath();
            ctx.arc(x + 10, y + 8, 7, 0, Math.PI * 2);
            ctx.fill();
            ctx.strokeStyle = "#854d0e";
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.moveTo(x + 10, y + 15);
            ctx.lineTo(x + 10, y + 26);
            ctx.stroke();
        } else {
            // Bandera Roja y Negra de Sandino (EDSNN) o Bandera de Nicaragua
            ctx.fillStyle = "#8b1e1e"; // Rojo
            ctx.fillRect(x + 4, y, 16, 7);
            ctx.fillStyle = lvlIndex === 3 ? "#004b87" : "#111116"; // Azul o Negro
            ctx.fillRect(x + 4, y + 7, 16, 7);
            // Asta
            ctx.strokeStyle = "#cbd5e1";
            ctx.lineWidth = 2.5;
            ctx.beginPath();
            ctx.moveTo(x + 4, y);
            ctx.lineTo(x + 4, y + 26);
            ctx.stroke();
        }
        ctx.restore();
    }

    // =========================================================================
    // 7. GESTIÓN DE HUD Y MODALES EDUCATIVOS
    // =========================================================================
    function updateHUD() {
        const hudLives = document.getElementById('hudLives');
        const hudScore = document.getElementById('hudScore');
        const hudLevel = document.getElementById('hudLevel');

        if (hudLives) {
            hudLives.textContent = '❤️'.repeat(Math.max(0, lives));
        }
        if (hudScore) {
            const currentLvl = HISTORICAL_LEVELS[currentLevelIndex];
            hudScore.textContent = `${score} / ${currentLvl.targetScore}`;
        }
        if (hudLevel) {
            hudLevel.textContent = `Nivel ${currentLevelIndex + 1} de 6`;
        }
    }

    function showLevelModal(lvl) {
        currentState = GAME_STATE.DIALOGUE;
        const modal = document.getElementById('dialogueModal');
        const title = document.getElementById('dialogueTitle');
        const period = document.getElementById('dialoguePeriod');
        const text = document.getElementById('dialogueText');
        const mission = document.getElementById('dialogueMission');
        const quote = document.getElementById('dialogueQuote');

        if (title) title.textContent = lvl.title;
        if (period) period.textContent = `Época: ${lvl.period} · Lugar: ${lvl.location}`;
        if (text) text.textContent = lvl.introText;
        if (mission) mission.textContent = `🎯 Misión: ${lvl.missionObjective}`;
        if (quote) quote.textContent = lvl.quote;

        if (modal) {
            modal.classList.add('active');
        }
    }

    function triggerLevelWin() {
        currentState = GAME_STATE.LEVEL_WIN;
        window.soundManager.play('levelWin');

        const lvl = HISTORICAL_LEVELS[currentLevelIndex];
        const winModal = document.getElementById('levelWinModal');
        const winTitle = document.getElementById('winTitle');
        const winDesc = document.getElementById('winDesc');

        if (winTitle) winTitle.textContent = "¡Victoria Histórica!";
        if (winDesc) winDesc.textContent = lvl.victoryText;

        if (winModal) {
            winModal.classList.add('active');
        }
    }

    function triggerGameOver() {
        currentState = GAME_STATE.GAME_OVER;
        window.soundManager.play('gameOver');

        const gameOverModal = document.getElementById('gameOverModal');
        if (gameOverModal) {
            gameOverModal.classList.add('active');
        }
    }

    function triggerFinalVictory() {
        currentState = GAME_STATE.VICTORY;
        window.soundManager.play('levelWin');

        const victoryModal = document.getElementById('finalVictoryModal');
        if (victoryModal) {
            victoryModal.classList.add('active');
        }
    }

    // =========================================================================
    // 8. BUCLE PRINCIPAL DE JUEGO (GAME LOOP)
    // =========================================================================
    function gameLoop() {
        updatePhysics();
        draw();
        gameLoopId = requestAnimationFrame(gameLoop);
    }

    // =========================================================================
    // 9. CONFIGURACIÓN DE EVENTOS Y CONTROLES
    // =========================================================================
    function initControls() {
        // Teclado
        window.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') keys.left = true;
            if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') keys.right = true;
            if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W' || e.key === ' ') {
                keys.up = true;
                e.preventDefault();
            }
            if (e.key === 'z' || e.key === 'Z' || e.key === 'x' || e.key === 'X') {
                keys.action = true;
            }
        });

        window.addEventListener('keyup', (e) => {
            if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') keys.left = false;
            if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') keys.right = false;
            if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W' || e.key === ' ') keys.up = false;
            if (e.key === 'z' || e.key === 'Z' || e.key === 'x' || e.key === 'X') keys.action = false;
        });

        // Botones táctiles para celulares
        const btnLeft = document.getElementById('btnTouchLeft');
        const btnRight = document.getElementById('btnTouchRight');
        const btnJump = document.getElementById('btnTouchJump');
        const btnAction = document.getElementById('btnTouchAction');

        const bindTouch = (elem, keyName) => {
            if (!elem) return;
            elem.addEventListener('touchstart', (e) => { e.preventDefault(); keys[keyName] = true; });
            elem.addEventListener('touchend', (e) => { e.preventDefault(); keys[keyName] = false; });
            elem.addEventListener('mousedown', (e) => { keys[keyName] = true; });
            elem.addEventListener('mouseup', (e) => { keys[keyName] = false; });
        };

        bindTouch(btnLeft, 'left');
        bindTouch(btnRight, 'right');
        bindTouch(btnJump, 'up');
        bindTouch(btnAction, 'action');

        // Botón Iniciar / Continuar Nivel
        const btnStartLevel = document.getElementById('btnStartLevel');
        if (btnStartLevel) {
            btnStartLevel.addEventListener('click', () => {
                const modal = document.getElementById('dialogueModal');
                if (modal) modal.classList.remove('active');
                currentState = GAME_STATE.PLAYING;
                window.soundManager.ensureActive();
                window.soundManager.play('dialogueNext');
            });
        }

        // Botón Siguiente Nivel
        const btnNextLevel = document.getElementById('btnNextLevel');
        if (btnNextLevel) {
            btnNextLevel.addEventListener('click', () => {
                const winModal = document.getElementById('levelWinModal');
                if (winModal) winModal.classList.remove('active');

                if (currentLevelIndex < HISTORICAL_LEVELS.length - 1) {
                    setupLevel(currentLevelIndex + 1);
                } else {
                    triggerFinalVictory();
                }
            });
        }

        // Botón Reintentar Nivel (Game Over)
        const btnRetry = document.getElementById('btnRetry');
        if (btnRetry) {
            btnRetry.addEventListener('click', () => {
                const gameOverModal = document.getElementById('gameOverModal');
                if (gameOverModal) gameOverModal.classList.remove('active');
                lives = 3;
                setupLevel(currentLevelIndex);
            });
        }

        // Botón Reiniciar Juego Completo
        const btnRestartAll = document.getElementById('btnRestartAll');
        if (btnRestartAll) {
            btnRestartAll.addEventListener('click', () => {
                const victoryModal = document.getElementById('finalVictoryModal');
                if (victoryModal) victoryModal.classList.remove('active');
                lives = 3;
                setupLevel(0);
            });
        }

        // Control de Sonido ON/OFF
        const btnToggleSound = document.getElementById('btnToggleSound');
        if (btnToggleSound) {
            btnToggleSound.addEventListener('click', () => {
                const isEnabled = window.soundManager.toggleSound();
                btnToggleSound.textContent = isEnabled ? '🔊 Sonido: ON' : '🔇 Sonido: OFF';
            });
        }
    }

    // Inicialización global
    function init() {
        initControls();
        setupLevel(0);
        updateHUD();
        gameLoop();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
