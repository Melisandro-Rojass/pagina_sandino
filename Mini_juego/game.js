/**
 * ==============================================================================
 *  game.js - MOTOR DEL JUEGO HISTÓRICO EDUCATIVO "LA GESTA DE SANDINO"
 * ==============================================================================
 *  Un videojuego histórico progresivo a través de los 6 hitos cruciales de la vida
 *  del General Augusto C. Sandino (1895 - 1934).
 *  Incluye:
 *  - Sistema de combate a distancia (Disparar fusil máuser de campaña con munición)
 *  - Combate cuerpo a cuerpo (Tajo táctico de machete)
 *  - Jefes históricos con barra de vida en niveles clave (Nivel 3 y Nivel 6)
 *  - Avance por el mapa geográfico de Nicaragua con puestos de avanzada
 *  - Selector interactivo de campaña y compatibilidad completa para PC y móvil
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
            introText: "Augusto Nicolás Calderón Sandino nació en Niquinohomo en 1895. De origen campesino humilde, experimentó el trabajo de la tierra y las desigualdades sociales. Tras recorrer México y Centroamérica conociendo las luchas obreras, regresó a Nicaragua resuelto a luchar por la dignidad y soberanía de su patria.",
            missionObjective: "Recolecta los 3 Manifiestos de Justicia Social, neutraliza o esquiva las patrullas y avanza hasta el Puesto de Avanzada al final del camino.",
            victoryText: "¡Has despertado la conciencia patriótica de Niquinohomo! Sandino emprende su marcha hacia el norte de Nicaragua.",
            quote: "“Soy nicaragüense y me siento orgulloso de que en mis venas circule la sangre india americana”.",
            targetScore: 3,
            bgColor: "#1a1e28",
            groundColor: "#42281a",
            skyGradient: ["#1e293b", "#0f172a"],
            enemyName: "Vigilante Interventor",
            enemySpeed: 1.2,
            isBossLevel: false
        },
        {
            id: 2,
            title: "Nivel 2: San Albino y el Rechazo al Espino Negro",
            period: "Mayo de 1927",
            location: "Minas de San Albino, Nueva Segovia",
            introText: "En las minas de San Albino, Sandino organizó a los obreros. Cuando los caudillos firmaron el Pacto del Espino Negro aceptando desarmarse ante EE.UU., Sandino fue el ÚNICO que se negó: 'Yo no me vendo ni me rindo; aquí no se rinde nadie'.",
            missionObjective: "Reúne las 3 Banderas Rojas y Negras del EDSNN, repele a los oficiales desarmadores con tu fusil y asegura el campamento rebelde.",
            victoryText: "¡Has fundado el Ejército Defensor de la Soberanía Nacional! La resistencia armada ha comenzado oficialmente.",
            quote: "“Mi espada empuñada defenderá el decoro nacional y dará la redención a los oprimidos”.",
            targetScore: 3,
            bgColor: "#261a18",
            groundColor: "#33221e",
            skyGradient: ["#3b1f1a", "#1a0f0d"],
            enemyName: "Oficial Desarmador",
            enemySpeed: 1.5,
            isBossLevel: false
        },
        {
            id: 3,
            title: "Nivel 3: El Chipote y la Guerra de Las Segovias",
            period: "1927 – 1930",
            location: "Montañas de Las Segovias y Cuartel El Chipote",
            introText: "Sandino estableció su cuartel rebelde en El Chipote. Las fuerzas invasoras utilizaron aviación militar por primera vez en Centroamérica. Sandino perfeccionó la guerra de guerrillas para enfrentar la asimetría bélica.",
            missionObjective: "⚔️ ¡BATALLA DE JEFE! Derriba al Biplano Interventor disparando tu fusil máuser desde las plataformas y esquiva sus bombardeos aéreos.",
            victoryText: "¡La aviación interventora ha sido derribada en El Chipote! Las Segovias permanecen invictas bajo la bandera de Sandino.",
            quote: "“La soberanía de un pueblo no se discute, se defiende con las armas en la mano”.",
            targetScore: 2,
            bgColor: "#13231a",
            groundColor: "#1d3826",
            skyGradient: ["#0f281e", "#07130e"],
            enemyName: "Patrulla de Marines",
            enemySpeed: 1.8,
            isBossLevel: true,
            bossType: "biplane",
            bossName: "Biplano Interventor & Escuadrón Marine",
            bossHp: 100
        },
        {
            id: 4,
            title: "Nivel 4: La Retirada de las Tropas Extranjeras",
            period: "Enero de 1933",
            location: "Caminos Soberanos de Nicaragua",
            introText: "Tras seis años de resistencia heroica que conmovió a los pueblos del mundo, el 1 de enero de 1933 los últimos contingentes de Marines abandonaron Nicaragua. Fue una victoria moral y militar sin precedentes.",
            missionObjective: "Recupera 4 Banderas Nacionales de Nicaragua, neutraliza a los últimos rezagados y culmina el trayecto libertador.",
            victoryText: "¡Nicaragua es libre de tropas interventoras! La gesta de Sandino forzó la retirada del invasor.",
            quote: "“Los Estados Unidos no pudieron vencer al pequeño ejército de campesinos patriotas”.",
            targetScore: 4,
            bgColor: "#141c2c",
            groundColor: "#1e293b",
            skyGradient: ["#0284c7", "#0c4a6e"],
            enemyName: "Último Destacamento",
            enemySpeed: 2.0,
            isBossLevel: false
        },
        {
            id: 5,
            title: "Nivel 5: Las Cooperativas de Wiwilí y el Río Coco",
            period: "1933 – 1934",
            location: "Río Coco, Wiwilí",
            introText: "Sandino firmó la paz con el gobierno y se retiró al río Coco en Wiwilí para fundar cooperativas agrícolas comunales, donde veteranos y familias campesinas cultivaban la tierra en colectividad, dignidad y paz.",
            missionObjective: "Recolecta 4 Herramientas de Labranza y Semillas, desactiva a los saboteadores y consolida la cooperativa agrícola comunal.",
            victoryText: "¡La cooperativa comunal florece! Sandino demostró su profundo amor por el campesinado y la justicia social.",
            quote: "“Todos los campesinos debemos estar unidos en el trabajo de la tierra libre”.",
            targetScore: 4,
            bgColor: "#1a2418",
            groundColor: "#2e3b22",
            skyGradient: ["#15803d", "#14532d"],
            enemyName: "Saboteador Feudal",
            enemySpeed: 1.7,
            isBossLevel: false
        },
        {
            id: 6,
            title: "Nivel 6: La Noche de Managua y la Inmortalidad",
            period: "21 de Febrero de 1934",
            location: "Managua, Loma de Tiscapa",
            introText: "Tras una cena de reconciliación en la Casa Presidencial, Sandino fue víctima de una traición ordenada por Anastasio Somoza García. Su sacrificio físico selló para siempre su paso a la Inmortalidad Patriótica.",
            missionObjective: "👑 ¡JEFE FINAL! Enfréntate a la Guardia Nacional Traidora en Tiscapa, resiste sus ráfagas y derrota al Comandante para consagrar la gesta eterna.",
            victoryText: "¡Sandino ha trascendido a la eternidad! El General de Hombres Libres vive en el alma soberana de Nicaragua.",
            quote: "“El hombre que de su patria no exige un palmo de tierra para su sepultura, merece ser oído y creído”.",
            targetScore: 3,
            bgColor: "#111118",
            groundColor: "#1f1d2b",
            skyGradient: ["#312e81", "#0f0e17"],
            enemyName: "Guardia Traidora",
            enemySpeed: 2.2,
            isBossLevel: true,
            isFinalBoss: true,
            bossType: "somocista",
            bossName: "Comandante de la Guardia Traidora",
            bossHp: 150
        }
    ];

    // =========================================================================
    // 2. CONFIGURACIÓN DEL CANVAS Y ESTADO GLOBAL
    // =========================================================================
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');

    const GAME_STATE = {
        START: 'start',
        DIALOGUE: 'dialogue',
        PLAYING: 'playing',
        LEVEL_WIN: 'level_win',
        GAME_OVER: 'game_over',
        MAP_VIEW: 'map_view',
        VICTORY: 'victory'
    };

    let currentState = GAME_STATE.START;
    let currentLevelIndex = 0;
    let score = 0;
    let lives = 3;
    let gameLoopId = null;

    // Progreso desbloqueado en el mapa de campaña (almacenado en localStorage)
    const STORAGE_KEY = 'sandino_game_max_unlocked_level';
    let maxUnlockedLevel = 0;
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved !== null) {
            maxUnlockedLevel = Math.max(0, Math.min(parseInt(saved, 10) || 0, HISTORICAL_LEVELS.length - 1));
        }
    } catch (e) {
        maxUnlockedLevel = 0;
    }

    function saveUnlockedLevel(levelIndex) {
        if (levelIndex > maxUnlockedLevel) {
            maxUnlockedLevel = Math.min(levelIndex, HISTORICAL_LEVELS.length - 1);
            try {
                localStorage.setItem(STORAGE_KEY, String(maxUnlockedLevel));
            } catch (e) {}
        }
        updateCampaignMapUI();
    }

    // Teclas presionadas
    const keys = {
        left: false,
        right: false,
        up: false,      // Saltar (W / Espacio)
        aimUp: false,   // Apuntar hacia arriba (flecha ↑ / botón táctil ▲)
        action: false,  // Machete
        shoot: false    // Disparo de fusil
    };

    // =========================================================================
    // 3. JUGADOR (SANDINO), PROYECTILES, JEFE Y OBJETOS
    // =========================================================================
    const player = {
        x: 80,
        y: 380,
        width: 36,
        height: 58,
        vx: 0,
        vy: 0,
        speed: 4.4,
        jumpPower: -12.8,
        onGround: false,
        facing: 'right',
        invulnerable: 0,
        frame: 0,

        // Ataque cuerpo a cuerpo (Machete)
        attacking: false,
        attackTimer: 0,
        attackRange: 85,
        attackCooldown: 0,

        // Disparo de Fusil de Campaña
        ammo: 6,
        maxAmmo: 6,
        shootCooldown: 0,
        isReloading: false,
        reloadTimer: 0,
        idleTimer: 0
    };

    let platforms = [];
    let items = [];
    let enemies = [];
    let playerBullets = [];
    let bossBullets = [];
    let bombs = [];
    let particles = [];
    let currentBoss = null;
    let outpost = null;

    // =========================================================================
    // 4. INICIALIZACIÓN DE NIVELES Y PUESTOS DE AVANZADA
    // =========================================================================
    function setupLevel(index) {
        currentLevelIndex = index;
        const lvl = HISTORICAL_LEVELS[currentLevelIndex];
        score = 0;

        // Resetear jugador
        player.x = 80;
        player.y = 380;
        player.vx = 0;
        player.vy = 0;
        player.invulnerable = 60;
        player.attacking = false;
        player.attackTimer = 0;
        player.attackCooldown = 0;
        player.ammo = player.maxAmmo;
        player.shootCooldown = 0;
        player.isReloading = false;
        player.reloadTimer = 0;
        player.idleTimer = 0;

        // Limpiar proyectiles y partículas
        playerBullets = [];
        bossBullets = [];
        bombs = [];
        particles = [];

        // Plataformas del nivel (1200x520)
        platforms = [
            // Suelo principal
            { x: 0, y: 480, width: 1200, height: 40 },
            // Plataformas flotantes
            { x: 120, y: 380, width: 130, height: 16 },
            { x: 320, y: 310, width: 150, height: 16 },
            { x: 530, y: 260, width: 140, height: 16 },
            { x: 720, y: 340, width: 130, height: 16 },
            { x: 900, y: 270, width: 160, height: 16 },
            { x: 1040, y: 200, width: 130, height: 16 },
            // Plataformas intermedias estratégicas
            { x: 220, y: 200, width: 110, height: 16 },
            { x: 670, y: 160, width: 130, height: 16 },
            { x: 450, y: 400, width: 110, height: 16 }
        ];

        // Puesto de Avanzada / Bandera Soberana al final del mapa
        outpost = {
            x: 1110,
            y: 410,
            width: 50,
            height: 70,
            unlocked: false,
            bannerOffset: 0
        };

        // Coleccionables (Manifiestos / Banderas / Semillas)
        items = [];
        const itemPositions = [
            { x: 170, y: 340 },
            { x: 380, y: 270 },
            { x: 570, y: 220 },
            { x: 760, y: 300 },
            { x: 960, y: 230 },
            { x: 1080, y: 160 },
            { x: 250, y: 160 },
            { x: 700, y: 120 }
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

        // Enemigos estándar del nivel
        enemies = [];
        const enemyCount = lvl.isBossLevel ? 2 : (index >= 2 ? 4 : 3);
        const enemySpawns = [
            { x: 290, y: 440, minX: 200, maxX: 460 },
            { x: 630, y: 440, minX: 520, maxX: 780 },
            { x: 920, y: 440, minX: 840, maxX: 1060 },
            { x: 550, y: 220, minX: 530, maxX: 660 },
            { x: 910, y: 230, minX: 900, maxX: 1040 }
        ];

        for (let i = 0; i < enemyCount; i++) {
            const spawn = enemySpawns[i % enemySpawns.length];
            enemies.push({
                x: spawn.x,
                y: spawn.y,
                width: 32,
                height: 52,
                vx: lvl.enemySpeed * (i % 2 === 0 ? 1 : -1),
                minX: spawn.minX,
                maxX: spawn.maxX,
                defeated: false,
                hp: 1
            });
        }

        // Configuración de Jefes Históricos
        if (lvl.isBossLevel) {
            if (lvl.bossType === 'biplane') {
                // Jefe Nivel 3: Biplano Interventor
                currentBoss = {
                    type: 'biplane',
                    name: lvl.bossName,
                    x: 600,
                    y: 80,
                    width: 96,
                    height: 38,
                    vx: 3.4,
                    vy: 0,
                    hp: lvl.bossHp,
                    maxHp: lvl.bossHp,
                    shootTimer: 0,
                    bombTimer: 0,
                    hitFlash: 0,
                    diveTimer: 0
                };
            } else if (lvl.bossType === 'somocista') {
                // Jefe Nivel 6: Comandante Somocista
                currentBoss = {
                    type: 'somocista',
                    name: lvl.bossName,
                    x: 960,
                    y: 420,
                    width: 38,
                    height: 58,
                    vx: -2.2,
                    minX: 740,
                    maxX: 1080,
                    hp: lvl.bossHp,
                    maxHp: lvl.bossHp,
                    shootTimer: 0,
                    dynamiteTimer: 0,
                    phase: 1,
                    hitFlash: 0,
                    enraged: false
                };
            }
        } else {
            currentBoss = null;
        }

        // Actualizar HUD y UI de Jefes
        updateHUD();
        updateCampaignMapUI();
        showLevelModal(lvl);

        // Iniciar soundtrack de batalla del nivel
        window.soundManager.playBattleMusic(index);
    }

    // =========================================================================
    // 5. MOTOR DE FÍSICA, COMBATE Y COLISIONES
    // =========================================================================
    function updatePhysics() {
        if (currentState !== GAME_STATE.PLAYING) return;

        // --- 1. MOVIMIENTO DE SANDINO ---
        if (keys.left) {
            player.vx = -player.speed;
            player.facing = 'left';
            player.frame += 0.2;
            player.idleTimer = 0;
        } else if (keys.right) {
            player.vx = player.speed;
            player.facing = 'right';
            player.frame += 0.2;
            player.idleTimer = 0;
        } else {
            player.vx *= 0.65; // Desaceleración suave
            player.idleTimer++;
        }

        // Salto (solo W / Espacio — tecla 'up')
        if (keys.up && player.onGround) {
            player.vy = player.jumpPower;
            player.onGround = false;
            window.soundManager.play('jump');
        }

        // Gravedad
        player.vy += 0.58;
        if (player.vy > 12) player.vy = 12;

        player.x += player.vx;
        player.y += player.vy;

        // Límites de la pantalla (1200x520)
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

        // Invulnerabilidad temporal de Sandino
        if (player.invulnerable > 0) player.invulnerable--;

        // Temporizadores de ataque y recarga
        if (player.attackTimer > 0) {
            player.attackTimer--;
            if (player.attackTimer === 0) player.attacking = false;
        }
        if (player.attackCooldown > 0) player.attackCooldown--;
        if (player.shootCooldown > 0) player.shootCooldown--;

        // Recarga de munición del fusil
        if (player.isReloading) {
            player.reloadTimer--;
            if (player.reloadTimer <= 0) {
                player.ammo = player.maxAmmo;
                player.isReloading = false;
                window.soundManager.play('ammoReload');
                updateHUD();
            }
        } else if (player.ammo < player.maxAmmo && player.idleTimer > 150) {
            // Recarga táctica pasiva al estar quieto sin disparar
            player.ammo = player.maxAmmo;
            window.soundManager.play('ammoReload');
            updateHUD();
        }

        // --- 2. SISTEMA DE DISPARO DEL FUSIL DE SANDINO ---
        // Disparo: horizontal normal o vertical hacia arriba
        const wantsToShoot = keys.shoot && player.shootCooldown === 0 && !player.isReloading;
        if (wantsToShoot) {
            if (player.ammo > 0) {
                player.ammo--;
                player.shootCooldown = 16;
                player.idleTimer = 0;
                window.soundManager.play('shoot');

                const shootingUp = keys.aimUp; // flecha ↑ o botón táctil ▲

                let bulletVx, bulletVy, bulletX, bulletY, bulletW, bulletH;
                if (shootingUp) {
                    // Bala hacia arriba
                    bulletX = player.x + player.width / 2 - 3;
                    bulletY = player.y - 10;
                    bulletVx = 0;
                    bulletVy = -14;
                    bulletW = 5;
                    bulletH = 14;
                } else {
                    // Bala horizontal
                    bulletVx = player.facing === 'right' ? 14 : -14;
                    bulletVy = 0;
                    bulletX = player.facing === 'right' ? player.x + player.width + 6 : player.x - 12;
                    bulletY = player.y + 24;
                    bulletW = 14;
                    bulletH = 5;
                }

                playerBullets.push({
                    x: bulletX,
                    y: bulletY,
                    vx: bulletVx,
                    vy: bulletVy,
                    life: 90,
                    width: bulletW,
                    height: bulletH,
                    isUp: shootingUp
                });

                // Muzzle flash
                if (shootingUp) {
                    createGunParticles(bulletX, bulletY, 0, -1);
                } else {
                    createGunParticles(bulletX, bulletY, player.facing === 'right' ? 1 : -1, 0);
                }
                updateHUD();

                if (player.ammo === 0) {
                    player.isReloading = true;
                    player.reloadTimer = 55;
                    updateHUD();
                }
            } else {
                player.isReloading = true;
                player.reloadTimer = 50;
                window.soundManager.play('ammoReload');
                updateHUD();
            }
            keys.shoot = false;
        }

        // --- 3. ATAQUE CUERPO A CUERPO (MACHETE DE SANDINO) ---
        if (keys.action && player.attackCooldown === 0) {
            player.attacking = true;
            player.attackTimer = 16;
            player.attackCooldown = 26;
            window.soundManager.play('attack');

            const attackX = player.facing === 'right'
                ? player.x + player.width
                : player.x - player.attackRange;
            const attackW = player.attackRange;
            const attackY = player.y + 5;
            const attackH = player.height - 10;

            // Daño a enemigos comunes
            enemies.forEach(enemy => {
                if (!enemy.defeated &&
                    attackX < enemy.x + enemy.width &&
                    attackX + attackW > enemy.x &&
                    attackY < enemy.y + enemy.height &&
                    attackY + attackH > enemy.y
                ) {
                    enemy.defeated = true;
                    window.soundManager.play('enemyDefeat');
                    createCollectParticles(enemy.x + 14, enemy.y + 20, '#8b1e1e');
                }
            });

            // Daño al Jefe si está a rango
            if (currentBoss && currentBoss.hp > 0) {
                if (
                    attackX < currentBoss.x + currentBoss.width &&
                    attackX + attackW > currentBoss.x &&
                    attackY < currentBoss.y + currentBoss.height &&
                    attackY + attackH > currentBoss.y
                ) {
                    damageBoss(18);
                }
            }

            keys.action = false;
        }

        // --- 4. ACTUALIZACIÓN DE PROYECTILES DEL JUGADOR ---
        playerBullets.forEach((bullet, bIdx) => {
            bullet.x += bullet.vx;
            bullet.y += (bullet.vy || 0);
            bullet.life--;

            // Impacto con enemigos comunes
            enemies.forEach(enemy => {
                if (!enemy.defeated &&
                    bullet.x < enemy.x + enemy.width &&
                    bullet.x + bullet.width > enemy.x &&
                    bullet.y < enemy.y + enemy.height &&
                    bullet.y + bullet.height > enemy.y
                ) {
                    enemy.defeated = true;
                    bullet.life = 0;
                    window.soundManager.play('enemyDefeat');
                    createCollectParticles(enemy.x + 16, enemy.y + 24, '#c69214');
                }
            });

            // Impacto con el Jefe Histórico (también acepta balas verticales)
            if (currentBoss && currentBoss.hp > 0) {
                if (
                    bullet.x < currentBoss.x + currentBoss.width &&
                    bullet.x + bullet.width > currentBoss.x &&
                    bullet.y < currentBoss.y + currentBoss.height &&
                    bullet.y + bullet.height > currentBoss.y
                ) {
                    bullet.life = 0;
                    damageBoss(12);
                }
            }

            // Bala vertical solo choca con plataformas al subir (no suelo)
            if (!bullet.isUp) {
                platforms.forEach(p => {
                    if (
                        bullet.x < p.x + p.width &&
                        bullet.x + bullet.width > p.x &&
                        bullet.y < p.y + p.height &&
                        bullet.y + bullet.height > p.y
                    ) {
                        bullet.life = 0;
                        createCollectParticles(bullet.x, bullet.y, '#f59e0b', 3);
                    }
                });
            }
        });
        playerBullets = playerBullets.filter(b => b.life > 0 && b.x >= -20 && b.x <= canvas.width + 20 && b.y >= -50);

        // --- 5. ACTUALIZACIÓN DE COLECCIONABLES HISTÓRICOS ---
        const lvl = HISTORICAL_LEVELS[currentLevelIndex];
        items.forEach(item => {
            if (!item.collected) {
                item.floatOffset += 0.06;
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

                    // Si se recolectaron los ítems necesarios, se abre la ruta al Puesto de Avanzada
                    if (score >= lvl.targetScore) {
                        if (!lvl.isBossLevel) {
                            outpost.unlocked = true;
                            createCollectParticles(outpost.x + 20, outpost.y + 30, '#c69214', 25);
                        }
                    }
                }
            }
        });

        // --- 6. PUESTO DE AVANZADA / PROGRESIÓN EN EL MAPA ---
        if (outpost) {
            outpost.bannerOffset += 0.05;
            // Si el nivel no es de jefe, se desbloquea al juntar los ítems
            if (!lvl.isBossLevel && score >= lvl.targetScore) {
                outpost.unlocked = true;
            }

            // Colisión con Sandino para completar el nivel
            if (outpost.unlocked) {
                if (
                    player.x < outpost.x + outpost.width &&
                    player.x + player.width > outpost.x &&
                    player.y < outpost.y + outpost.height &&
                    player.y + player.height > outpost.y
                ) {
                    triggerLevelWin();
                }
            }
        }

        // --- 7. ACTUALIZACIÓN DE ENEMIGOS COMUNES ---
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
                // Salto táctico sobre el enemigo
                if (player.vy > 1 && player.y + player.height < enemy.y + 24) {
                    enemy.defeated = true;
                    player.vy = -7.5;
                    window.soundManager.play('enemyDefeat');
                    createCollectParticles(enemy.x + 14, enemy.y + 10, '#c69214');
                } else {
                    // Sandino recibe daño
                    takeDamage();
                }
            }
        });

        // --- 8. MECÁNICAS DE JEFES HISTÓRICOS ---
        if (currentBoss && currentBoss.hp > 0) {
            if (currentBoss.type === 'biplane') {
                updateBiplaneBoss(currentBoss);
            } else if (currentBoss.type === 'somocista') {
                updateSomocistaBoss(currentBoss);
            }
        }

        // --- 9. ACTUALIZACIÓN DE PROYECTILES DEL JEFE / BOMBAS ---
        bossBullets.forEach(bb => {
            bb.x += bb.vx;
            bb.y += bb.vy;

            // Daño al jugador
            if (
                player.invulnerable === 0 &&
                player.x < bb.x + bb.width &&
                player.x + player.width > bb.x &&
                player.y < bb.y + bb.height &&
                player.y + player.height > bb.y
            ) {
                bb.dead = true;
                takeDamage();
            }

            if (bb.y > 480 || bb.x < 0 || bb.x > canvas.width) {
                bb.dead = true;
                createCollectParticles(bb.x, Math.min(480, bb.y), '#ef4444', 4);
            }
        });
        bossBullets = bossBullets.filter(bb => !bb.dead);

        bombs.forEach(b => {
            b.y += b.vy;
            if (b.y >= 475) {
                b.exploded = true;
                createCollectParticles(b.x, b.y, '#e53e3e', 14);
            }

            if (
                !b.exploded &&
                player.invulnerable === 0 &&
                Math.hypot(player.x + 18 - b.x, player.y + 28 - b.y) < 28
            ) {
                b.exploded = true;
                takeDamage();
            }
        });
        bombs = bombs.filter(b => !b.exploded);

        // --- 10. PARTÍCULAS ---
        particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            p.alpha -= 0.028;
        });
        particles = particles.filter(p => p.alpha > 0);
    }

    /**
     * Lógica del Jefe Biplano (Nivel 3)
     */
    function updateBiplaneBoss(boss) {
        boss.x += boss.vx;
        if (boss.x <= 80 || boss.x >= canvas.width - boss.width - 80) {
            boss.vx *= -1;
        }

        // Bombardeo periódico
        boss.bombTimer++;
        if (boss.bombTimer > 85 && Math.random() < 0.6) {
            boss.bombTimer = 0;
            bombs.push({
                x: boss.x + boss.width / 2,
                y: boss.y + boss.height,
                vy: 3.5,
                exploded: false
            });
            window.soundManager.play('bossShoot');
        }

        // Ráfaga de ametralladora hacia Sandino
        boss.shootTimer++;
        if (boss.shootTimer > 95) {
            boss.shootTimer = 0;
            const angle = Math.atan2((player.y + 20) - (boss.y + boss.height), (player.x + 18) - (boss.x + boss.width / 2));
            const speed = 5.2;
            bossBullets.push({
                x: boss.x + boss.width / 2,
                y: boss.y + boss.height,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                width: 8,
                height: 8,
                dead: false
            });
            window.soundManager.play('bossShoot');
        }

        // Sandino choca directamente con el biplano
        if (
            player.invulnerable === 0 &&
            player.x < boss.x + boss.width &&
            player.x + player.width > boss.x &&
            player.y < boss.y + boss.height &&
            player.y + player.height > boss.y
        ) {
            takeDamage();
        }
    }

    /**
     * Lógica del Jefe Somocista (Nivel 6)
     */
    function updateSomocistaBoss(boss) {
        boss.x += boss.vx;
        if (boss.x <= boss.minX || boss.x >= boss.maxX) {
            boss.vx *= -1;
        }

        // Fases de combate
        if (boss.hp <= boss.maxHp * 0.5 && !boss.enraged) {
            boss.enraged = true;
            boss.phase = 2;
            boss.vx *= 1.4;
            createCollectParticles(boss.x + 20, boss.y + 20, '#ef4444', 30);
        }

        // Disparo de revólver o ráfaga
        boss.shootTimer++;
        const fireInterval = boss.enraged ? 55 : 85;
        if (boss.shootTimer > fireInterval) {
            boss.shootTimer = 0;
            const dir = player.x < boss.x ? -1 : 1;
            bossBullets.push({
                x: dir === 1 ? boss.x + boss.width + 4 : boss.x - 12,
                y: boss.y + 26,
                vx: dir * (boss.enraged ? 7.5 : 6.0),
                vy: 0,
                width: 10,
                height: 6,
                dead: false
            });
            window.soundManager.play('bossShoot');
        }

        // Lanzamiento de dinamita en Fase 2
        if (boss.enraged) {
            boss.dynamiteTimer = (boss.dynamiteTimer || 0) + 1;
            if (boss.dynamiteTimer > 130) {
                boss.dynamiteTimer = 0;
                const dir = player.x < boss.x ? -1 : 1;
                bossBullets.push({
                    x: boss.x + 18,
                    y: boss.y + 10,
                    vx: dir * 4.2,
                    vy: -5.5,
                    width: 12,
                    height: 12,
                    isDynamite: true,
                    dead: false
                });
                window.soundManager.play('bossShoot');
            }
        }

        // Colisión cuerpo a cuerpo con Sandino
        if (
            player.invulnerable === 0 &&
            player.x < boss.x + boss.width &&
            player.x + player.width > boss.x &&
            player.y < boss.y + boss.height &&
            player.y + player.height > boss.y
        ) {
            takeDamage();
        }
    }

    /**
     * Daño recibido por Sandino
     */
    function takeDamage() {
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

    /**
     * Daño infligido al Jefe Histórico
     */
    function damageBoss(amount) {
        if (!currentBoss || currentBoss.hp <= 0) return;

        currentBoss.hp = Math.max(0, currentBoss.hp - amount);
        currentBoss.hitFlash = 12;
        window.soundManager.play('bossHit');
        createCollectParticles(currentBoss.x + currentBoss.width / 2, currentBoss.y + currentBoss.height / 2, '#ef4444', 10);
        updateBossBarUI();

        if (currentBoss.hp <= 0) {
            // Jefe Derrotado
            window.soundManager.play('bossDefeat');
            createCollectParticles(currentBoss.x + currentBoss.width / 2, currentBoss.y + currentBoss.height / 2, '#f59e0b', 45);
            createCollectParticles(currentBoss.x + currentBoss.width / 2, currentBoss.y + currentBoss.height / 2, '#ef4444', 45);

            if (outpost) {
                outpost.unlocked = true;
                outpost.x = currentBoss.x;
                outpost.y = 410;
            }

            // Pequeña pausa antes de cantar victoria
            setTimeout(() => {
                triggerLevelWin();
            }, 600);
        }
    }

    function createCollectParticles(x, y, color = '#f4c430', count = 10) {
        for (let i = 0; i < count; i++) {
            particles.push({
                x,
                y,
                vx: (Math.random() - 0.5) * 5.5,
                vy: (Math.random() - 0.5) * 5.5,
                color,
                size: Math.random() * 4 + 2,
                alpha: 1.0
            });
        }
    }

    function createGunParticles(x, y, dirX = 1, dirY = 0) {
        for (let i = 0; i < 6; i++) {
            particles.push({
                x,
                y,
                vx: dirX !== 0 ? dirX * (Math.random() * 4 + 2) : (Math.random() - 0.5) * 3,
                vy: dirY !== 0 ? dirY * (Math.random() * 4 + 2) : (Math.random() - 0.5) * 3,
                color: Math.random() > 0.5 ? '#fde047' : '#f97316',
                size: Math.random() * 3 + 2,
                alpha: 1.0
            });
        }
    }

    // =========================================================================
    // 6. RENDERIZADO VISUAL DEL JUEGO (CANVAS ENGINE)
    // =========================================================================
    function draw() {
        const lvl = HISTORICAL_LEVELS[currentLevelIndex];

        // 1. Cielo con degradado histórico
        const skyGrad = ctx.createLinearGradient(0, 0, 0, canvas.height);
        skyGrad.addColorStop(0, lvl.skyGradient[0]);
        skyGrad.addColorStop(1, lvl.skyGradient[1]);
        ctx.fillStyle = skyGrad;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // 2. Siluetas y montañas lejanas de Las Segovias
        drawParallaxBackground(lvl);

        // 3. Plataformas del terreno
        platforms.forEach(p => {
            ctx.fillStyle = lvl.groundColor;
            ctx.fillRect(p.x, p.y, p.width, p.height);

            // Borde superior patrio
            ctx.fillStyle = '#004b87';
            ctx.fillRect(p.x, p.y, p.width, 3);
        });

        // 4. Puesto de Avanzada / Bandera Soberana al final del mapa
        if (outpost) {
            drawOutpost(outpost);
        }

        // 5. Coleccionables (Manifiestos, Banderas, Semillas)
        items.forEach(item => {
            if (!item.collected) {
                const floatY = item.y + Math.sin(item.floatOffset) * 4;
                drawItem(item.x, floatY, currentLevelIndex);
            }
        });

        // 6. Enemigos comunes
        enemies.forEach(enemy => {
            if (!enemy.defeated) {
                drawEnemy(enemy, currentLevelIndex);
            }
        });

        // 7. Jefes Históricos
        if (currentBoss && currentBoss.hp > 0) {
            if (currentBoss.type === 'biplane') {
                drawBiplaneBoss(currentBoss);
            } else if (currentBoss.type === 'somocista') {
                drawSomocistaBoss(currentBoss);
            }
        }

        // 8. Proyectiles del jugador (Balas de fusil)
        playerBullets.forEach(b => {
            ctx.save();
            ctx.fillStyle = '#fde047';
            ctx.shadowColor = '#f59e0b';
            ctx.shadowBlur = 8;
            ctx.fillRect(b.x, b.y, b.width, b.height);
            // Estela brillante
            if (b.isUp) {
                // Estela hacia abajo de la bala vertical
                ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
                ctx.fillRect(b.x + 1, b.y + b.height, b.width - 2, 6);
            } else {
                ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
                ctx.fillRect(b.vx > 0 ? b.x - 6 : b.x + b.width, b.y + 1, 6, b.height - 2);
            }
            ctx.restore();
        });

        // 9. Proyectiles del Jefe / Bombas
        bossBullets.forEach(bb => {
            ctx.save();
            if (bb.isDynamite) {
                ctx.fillStyle = '#dc2626';
                ctx.fillRect(bb.x, bb.y, bb.width, bb.height);
                ctx.fillStyle = '#f59e0b';
                ctx.fillRect(bb.x + 4, bb.y - 4, 3, 4); // Mecha
            } else {
                ctx.fillStyle = '#ef4444';
                ctx.shadowColor = '#dc2626';
                ctx.shadowBlur = 6;
                ctx.beginPath();
                ctx.arc(bb.x + bb.width / 2, bb.y + bb.height / 2, bb.width / 2, 0, Math.PI * 2);
                ctx.fill();
            }
            ctx.restore();
        });

        bombs.forEach(b => {
            ctx.fillStyle = '#1e293b';
            ctx.beginPath();
            ctx.arc(b.x, b.y, 7, 0, Math.PI * 2);
            ctx.fill();
            // Aleta roja
            ctx.fillStyle = '#e11d48';
            ctx.fillRect(b.x - 2, b.y - 10, 4, 6);
        });

        // 10. Dibujar a Augusto C. Sandino
        drawSandino();

        // 11. Partículas
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
     * Dibuja el fondo de montañas de Las Segovias
     */
    function drawParallaxBackground(lvl) {
        ctx.save();
        ctx.fillStyle = "rgba(0, 0, 0, 0.28)";

        // Montañas lejanas
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

        // Montañas cercanas
        ctx.fillStyle = "rgba(0, 0, 0, 0.16)";
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
        ctx.restore();
    }

    /**
     * Dibuja el Puesto de Avanzada / Hito Histórico al final del mapa
     */
    function drawOutpost(op) {
        ctx.save();
        // Asta patriota
        ctx.strokeStyle = '#94a3b8';
        ctx.lineWidth = 3.5;
        ctx.beginPath();
        ctx.moveTo(op.x + 20, op.y + 70);
        ctx.lineTo(op.x + 20, op.y);
        ctx.stroke();

        // Bandera ondeando (Rojinegra de Sandino o Azul y Blanco según desbloqueo)
        const wave = Math.sin(op.bannerOffset) * 4;
        ctx.fillStyle = op.unlocked ? '#8b1e1e' : '#475569';
        ctx.fillRect(op.x + 20, op.y + 4 + wave, 24, 10);
        ctx.fillStyle = op.unlocked ? '#111116' : '#1e293b';
        ctx.fillRect(op.x + 20, op.y + 14 + wave, 24, 10);

        // Halo de victoria si la ruta está desbloqueada
        if (op.unlocked) {
            ctx.fillStyle = 'rgba(250, 204, 21, 0.2)';
            ctx.beginPath();
            ctx.arc(op.x + 20, op.y + 35, 36, 0, Math.PI * 2);
            ctx.fill();

            // Cartel flotante indicando avanzar
            ctx.fillStyle = '#fde047';
            ctx.font = 'bold 12px Poppins, sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText('¡Ruta Abierta! ➔', op.x + 20, op.y - 12);
        } else {
            ctx.fillStyle = '#94a3b8';
            ctx.font = '11px Poppins, sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText('Puesto', op.x + 20, op.y - 8);
        }
        ctx.restore();
    }

    /**
     * Dibuja a Augusto C. Sandino con uniforme, fusil y machete
     */
    function drawSandino() {
        if (player.invulnerable > 0 && Math.floor(player.invulnerable / 5) % 2 === 0) {
            return;
        }

        ctx.save();
        const px = player.x;
        const py = player.y;

        if (player.facing === 'left') {
            ctx.translate(px + player.width, py);
            ctx.scale(-1, 1);
        } else {
            ctx.translate(px, py);
        }

        // --- ARMA: MACHETE (CUERPO A CUERPO) O FUSIL ---
        if (player.attacking && player.attackTimer > 0) {
            ctx.save();
            const swingProgress = 1 - (player.attackTimer / 16);
            const swingAngle = -Math.PI / 3 + (swingProgress * Math.PI * 0.85);
            ctx.translate(26, 28);
            ctx.rotate(swingAngle);

            // Hoja del machete
            ctx.fillStyle = "#e2e8f0";
            ctx.beginPath();
            ctx.moveTo(0, -3);
            ctx.lineTo(46, -5);
            ctx.lineTo(49, 0);
            ctx.lineTo(46, 5);
            ctx.lineTo(0, 3);
            ctx.closePath();
            ctx.fill();
            ctx.strokeStyle = "#ffffff";
            ctx.lineWidth = 1;
            ctx.stroke();

            // Mango de madera
            ctx.fillStyle = "#78350f";
            ctx.fillRect(-8, -4, 10, 8);

            // Estela visual del machete
            ctx.globalAlpha = 0.35 * (1 - swingProgress);
            ctx.strokeStyle = "#ffffff";
            ctx.lineWidth = 2.5;
            ctx.beginPath();
            ctx.arc(0, 0, 45, -0.6, 0.6);
            ctx.stroke();
            ctx.restore();
        } else {
            // Fusil máuser: horizontal o apuntando hacia arriba
            ctx.save();
            if (keys.aimUp) {
                // Fusil apuntando verticalmente hacia arriba
                ctx.translate(22, 28);
                ctx.rotate(-Math.PI / 2 + (player.shootCooldown > 10 ? 0.08 : 0));
                // Cañón del fusil (apuntando arriba)
                ctx.fillStyle = "#334155";
                ctx.fillRect(0, -2, 38, 4);
                // Culata de madera
                ctx.fillStyle = "#78350f";
                ctx.fillRect(-14, -4, 14, 8);
            } else {
                // Fusil horizontal táctica normal
                ctx.translate(20, 22);
                if (player.shootCooldown > 10) {
                    ctx.rotate(-Math.PI / 16);
                }
                ctx.fillStyle = "#334155";
                ctx.fillRect(0, -2, 36, 4);
                ctx.fillStyle = "#78350f";
                ctx.fillRect(-12, -4, 14, 8);
            }
            ctx.restore();
        }

        // --- 1. SOMBRERO ALÓN CARACTERÍSTICO DE SANDINO ---
        ctx.fillStyle = "#fef08a";
        ctx.beginPath();
        ctx.ellipse(18, 8, 22, 6, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = "#854d0e";
        ctx.stroke();

        // Copa alta
        ctx.fillRect(10, -10, 16, 18);

        // Cinta roja y negra en el sombrero
        ctx.fillStyle = "#8b1e1e";
        ctx.fillRect(10, 3, 8, 4);
        ctx.fillStyle = "#111116";
        ctx.fillRect(18, 3, 8, 4);

        // --- 2. CABEZA / ROSTRO ---
        ctx.fillStyle = "#d4a373";
        ctx.fillRect(12, 8, 12, 12);

        // Ojos y bigote de Sandino
        ctx.fillStyle = "#26130b";
        ctx.fillRect(19, 12, 2, 2);
        ctx.fillRect(15, 16, 7, 2);

        // --- 3. PAÑUELO ROJO Y NEGRO AL CUELLO ---
        ctx.fillStyle = "#8b1e1e";
        ctx.beginPath();
        ctx.moveTo(12, 20);
        ctx.lineTo(24, 20);
        ctx.lineTo(18, 28);
        ctx.closePath();
        ctx.fill();

        // --- 4. CAMISA Y CARTUCHERAS CRUZADAS ---
        ctx.fillStyle = "#4d5b40"; // Chaqueta caqui/oliva
        ctx.fillRect(10, 23, 16, 20);

        ctx.strokeStyle = "#78350f";
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.moveTo(10, 24);
        ctx.lineTo(26, 42);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(26, 24);
        ctx.lineTo(10, 42);
        ctx.stroke();

        // --- 5. PANTALÓN Y BOTAS ALTAS DE CUERO ---
        ctx.fillStyle = "#2d3326";
        ctx.fillRect(11, 43, 6, 12);
        ctx.fillRect(19, 43, 6, 12);

        ctx.fillStyle = "#451a03";
        ctx.fillRect(10, 50, 7, 8);
        ctx.fillRect(19, 50, 7, 8);

        ctx.restore();
    }

    /**
     * Dibuja al Jefe Biplano Interventor (Nivel 3)
     */
    function drawBiplaneBoss(boss) {
        ctx.save();
        const bx = boss.x;
        const by = boss.y;

        if (boss.hitFlash > 0) {
            boss.hitFlash--;
            ctx.filter = 'brightness(2.2)';
        }

        // Fuselaje
        ctx.fillStyle = '#475569';
        ctx.fillRect(bx + 14, by + 12, boss.width - 28, 16);

        // Cola del biplano
        ctx.beginPath();
        ctx.moveTo(bx + boss.width - 14, by + 12);
        ctx.lineTo(bx + boss.width, by + 4);
        ctx.lineTo(bx + boss.width, by + 28);
        ctx.closePath();
        ctx.fill();

        // Alas dobles (Biplano militar de la época)
        ctx.fillStyle = '#334155';
        ctx.fillRect(bx + 4, by, boss.width - 10, 8); // Ala superior
        ctx.fillRect(bx + 8, by + 26, boss.width - 20, 8); // Ala inferior

        // Postes de soporte de alas
        ctx.strokeStyle = '#94a3b8';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(bx + 25, by + 8);
        ctx.lineTo(bx + 25, by + 26);
        ctx.moveTo(bx + 65, by + 8);
        ctx.lineTo(bx + 65, by + 26);
        ctx.stroke();

        // Hélice giratoria
        ctx.fillStyle = '#e2e8f0';
        ctx.fillRect(bx + 4, by + 10, 4, 20);

        // Marcador del Jefe / Barra de vida flotante
        ctx.fillStyle = '#dc2626';
        ctx.fillRect(bx + 10, by - 12, boss.width - 20, 5);
        ctx.fillStyle = '#22c55e';
        ctx.fillRect(bx + 10, by - 12, (boss.width - 20) * (boss.hp / boss.maxHp), 5);

        ctx.restore();
    }

    /**
     * Dibuja al Jefe Somocista (Nivel 6)
     */
    function drawSomocistaBoss(boss) {
        ctx.save();
        const bx = boss.x;
        const by = boss.y;

        if (boss.hitFlash > 0) {
            boss.hitFlash--;
            ctx.filter = 'brightness(2.2)';
        }

        // Abrigo militar oscuro
        ctx.fillStyle = boss.enraged ? '#7f1d1d' : '#0f172a';
        ctx.fillRect(bx + 6, by + 16, boss.width - 12, 26);

        // Cabeza y quepis militar
        ctx.fillStyle = '#d4a373';
        ctx.fillRect(bx + 12, by + 6, 14, 12);
        ctx.fillStyle = '#1e293b';
        ctx.fillRect(bx + 8, by, 22, 8); // Gorra de mando militar
        ctx.fillStyle = '#f59e0b';
        ctx.fillRect(bx + 16, by + 4, 6, 3); // Insignia dorada

        // Hombreras y cinturón
        ctx.fillStyle = '#f59e0b';
        ctx.fillRect(bx + 4, by + 16, 6, 5);
        ctx.fillRect(bx + boss.width - 10, by + 16, 6, 5);

        // Arma en mano
        ctx.fillStyle = '#475569';
        ctx.fillRect(bx + (boss.vx < 0 ? -4 : boss.width - 2), by + 24, 12, 5);

        // Pantalón y botas
        ctx.fillStyle = '#020617';
        ctx.fillRect(bx + 8, by + 42, 8, 16);
        ctx.fillRect(bx + 20, by + 42, 8, 16);

        // Barra flotante de vida
        ctx.fillStyle = '#dc2626';
        ctx.fillRect(bx, by - 14, boss.width, 5);
        ctx.fillStyle = '#22c55e';
        ctx.fillRect(bx, by - 14, boss.width * (boss.hp / boss.maxHp), 5);

        ctx.restore();
    }

    /**
     * Dibuja los enemigos comunes según el nivel
     */
    function drawEnemy(enemy, lvlIndex) {
        ctx.save();
        const ex = enemy.x;
        const ey = enemy.y;

        if (lvlIndex === 2) {
            // Marine estadounidense (uniforme caqui, casco redondo de acero)
            ctx.fillStyle = "#94a3b8";
            ctx.beginPath();
            ctx.arc(ex + 14, ey + 8, 10, Math.PI, Math.PI * 2);
            ctx.fill();

            ctx.fillStyle = "#e2e8f0";
            ctx.fillRect(ex + 9, ey + 8, 10, 8);

            ctx.fillStyle = "#713f12";
            ctx.fillRect(ex + 7, ey + 16, 14, 18);
            ctx.fillStyle = "#334155";
            ctx.fillRect(ex + 8, ey + 34, 12, 14);
        } else if (lvlIndex === 5) {
            // Guardia Nacional traidora de Managua
            ctx.fillStyle = "#1e293b";
            ctx.fillRect(ex + 7, ey + 4, 14, 10);
            ctx.fillStyle = "#0f172a";
            ctx.fillRect(ex + 6, ey + 14, 16, 20);
            ctx.fillStyle = "#1e1b4b";
            ctx.fillRect(ex + 7, ey + 34, 14, 14);
        } else {
            // Patrulla interventora / Emisarios
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
            // Manifiesto con pergamino
            ctx.fillStyle = "#fef3c7";
            ctx.fillRect(x, y, 18, 22);
            ctx.strokeStyle = "#b45309";
            ctx.strokeRect(x, y, 18, 22);
            ctx.fillStyle = "#b45309";
            ctx.fillRect(x + 3, y + 5, 12, 2);
            ctx.fillRect(x + 3, y + 10, 12, 2);
            ctx.fillRect(x + 3, y + 15, 8, 2);
        } else if (lvlIndex === 4) {
            // Herramienta de cooperativa de Wiwilí (azadón / espiga)
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
            ctx.fillStyle = "#8b1e1e";
            ctx.fillRect(x + 4, y, 16, 7);
            ctx.fillStyle = lvlIndex === 3 ? "#004b87" : "#111116";
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
    // 7. GESTIÓN DEL HUD Y MODALES EDUCATIVOS
    // =========================================================================
    function updateHUD() {
        const hudLives = document.getElementById('hudLives');
        const hudScore = document.getElementById('hudScore');
        const hudLevel = document.getElementById('hudLevel');
        const hudAmmo = document.getElementById('hudAmmo');

        if (hudLives) hudLives.textContent = '❤️'.repeat(Math.max(0, lives));
        if (hudScore) {
            const currentLvl = HISTORICAL_LEVELS[currentLevelIndex];
            hudScore.textContent = `${score} / ${currentLvl.targetScore}`;
        }
        if (hudLevel) {
            hudLevel.textContent = `Nivel ${currentLevelIndex + 1} de 6`;
        }
        if (hudAmmo) {
            if (player.isReloading) {
                hudAmmo.textContent = '🔄 Recargando...';
            } else {
                hudAmmo.textContent = `🎯 ${player.ammo} / ${player.maxAmmo}`;
            }
        }

        updateBossBarUI();
    }

    function updateBossBarUI() {
        const bossContainer = document.getElementById('hudBossContainer');
        const bossNameElem = document.getElementById('bossName');
        const bossHpText = document.getElementById('bossHpText');
        const bossBarFill = document.getElementById('bossBarFill');

        if (!bossContainer) return;

        if (currentBoss && currentBoss.hp > 0) {
            bossContainer.classList.remove('is-hidden');
            if (bossNameElem) bossNameElem.textContent = `⚔️ ${currentBoss.name}`;
            if (bossHpText) bossHpText.textContent = `${Math.ceil(currentBoss.hp)} / ${currentBoss.maxHp} HP`;
            if (bossBarFill) {
                const pct = Math.max(0, (currentBoss.hp / currentBoss.maxHp) * 100);
                bossBarFill.style.width = `${pct}%`;
            }
        } else {
            bossContainer.classList.add('is-hidden');
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

        if (modal) modal.classList.add('active');
    }

    function triggerLevelWin() {
        currentState = GAME_STATE.LEVEL_WIN;
        window.soundManager.play('levelWin');

        // Desbloquear siguiente nivel en el mapa
        saveUnlockedLevel(currentLevelIndex + 1);

        const lvl = HISTORICAL_LEVELS[currentLevelIndex];
        const winModal = document.getElementById('levelWinModal');
        const winTitle = document.getElementById('winTitle');
        const winDesc = document.getElementById('winDesc');

        if (winTitle) winTitle.textContent = "¡Victoria Histórica!";
        if (winDesc) winDesc.textContent = lvl.victoryText;

        if (winModal) winModal.classList.add('active');
    }

    function triggerGameOver() {
        currentState = GAME_STATE.GAME_OVER;
        window.soundManager.play('gameOver');

        const gameOverModal = document.getElementById('gameOverModal');
        if (gameOverModal) gameOverModal.classList.add('active');
    }

    function triggerFinalVictory() {
        currentState = GAME_STATE.VICTORY;
        window.soundManager.play('levelWin');

        const victoryModal = document.getElementById('finalVictoryModal');
        if (victoryModal) victoryModal.classList.add('active');
    }

    // =========================================================================
    // 8. MAPA INTERACTIVO DE LA CAMPAÑA DE NICARAGUA
    // =========================================================================
    function openCampaignMap() {
        currentState = GAME_STATE.MAP_VIEW;
        window.soundManager.play('mapOpen');
        updateCampaignMapUI();

        const mapModal = document.getElementById('campaignMapModal');
        if (mapModal) mapModal.classList.add('active');
    }

    function closeCampaignMap() {
        const mapModal = document.getElementById('campaignMapModal');
        if (mapModal) mapModal.classList.remove('active');
        currentState = GAME_STATE.PLAYING;
    }

    function updateCampaignMapUI() {
        for (let i = 0; i < HISTORICAL_LEVELS.length; i++) {
            const nodeElem = document.getElementById(`mapNode${i}`);
            if (!nodeElem) continue;

            nodeElem.classList.remove('node-unlocked', 'node-completed', 'node-active');

            if (i < currentLevelIndex) {
                nodeElem.classList.add('node-unlocked', 'node-completed');
                const marker = nodeElem.querySelector('.node-marker');
                if (marker) marker.textContent = '⭐';
            } else if (i === currentLevelIndex) {
                nodeElem.classList.add('node-unlocked', 'node-active');
                const marker = nodeElem.querySelector('.node-marker');
                if (marker) marker.textContent = '🚩';
            } else if (i <= maxUnlockedLevel) {
                nodeElem.classList.add('node-unlocked');
                const marker = nodeElem.querySelector('.node-marker');
                if (marker) marker.textContent = String(i + 1);
            } else {
                const marker = nodeElem.querySelector('.node-marker');
                if (marker) marker.textContent = '🔒';
            }
        }
    }

    // =========================================================================
    // 9. BUCLE PRINCIPAL DE JUEGO (GAME LOOP)
    // =========================================================================
    function gameLoop() {
        updatePhysics();
        draw();
        gameLoopId = requestAnimationFrame(gameLoop);
    }

    // =========================================================================
    // 10. CONFIGURACIÓN DE EVENTOS Y CONTROLES (PC Y MÓVIL)
    // =========================================================================
    function initControls() {
        // --- TECLADO ---
        window.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') keys.left = true;
            if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') keys.right = true;

            // W / Espacio = SALTAR
            if (e.key === 'w' || e.key === 'W' || e.key === ' ') {
                keys.up = true;
                if (e.key === ' ') e.preventDefault();
            }
            // Flecha ↑ = APUNTAR HACIA ARRIBA (no salta)
            if (e.key === 'ArrowUp') {
                keys.aimUp = true;
                e.preventDefault();
            }

            if (e.key === 'z' || e.key === 'Z') {
                keys.action = true; // Machete
            }
            if (e.key === 'x' || e.key === 'X' || e.key === 'c' || e.key === 'C') {
                keys.shoot = true; // Fusil
            }
            if (e.key === 'm' || e.key === 'M') {
                const mapModal = document.getElementById('campaignMapModal');
                if (mapModal && mapModal.classList.contains('active')) {
                    closeCampaignMap();
                } else {
                    openCampaignMap();
                }
            }
        });

        window.addEventListener('keyup', (e) => {
            if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') keys.left = false;
            if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') keys.right = false;
            if (e.key === 'w' || e.key === 'W' || e.key === ' ') keys.up = false;
            if (e.key === 'ArrowUp') keys.aimUp = false;
            if (e.key === 'z' || e.key === 'Z') keys.action = false;
            if (e.key === 'x' || e.key === 'X' || e.key === 'c' || e.key === 'C') keys.shoot = false;
        });

        // --- TOGGLE SIDEBAR DE CONTROLES ---
        const sidebar = document.getElementById('controlsSidebar');
        const backdrop = document.getElementById('controlsBackdrop');
        const btnSide = document.getElementById('btnSideToggleControls');

        function isMobile() { return window.innerWidth <= 960; }

        function openSidebar() {
            if (!sidebar) return;
            sidebar.classList.remove('is-hidden');
            sidebar.classList.add('is-open');
            if (isMobile() && backdrop) {
                backdrop.classList.add('is-visible');
            }
            if (btnSide) btnSide.classList.remove('is-visible');
        }

        function closeSidebar() {
            if (!sidebar) return;
            sidebar.classList.remove('is-open');
            sidebar.classList.add('is-hidden');
            if (backdrop) backdrop.classList.remove('is-visible');
            if (btnSide) btnSide.classList.add('is-visible');
        }

        const btnToggle = document.getElementById('btnToggleControls');
        if (btnToggle) {
            btnToggle.addEventListener('click', () => {
                if (sidebar && sidebar.classList.contains('is-hidden')) {
                    openSidebar();
                } else {
                    closeSidebar();
                }
            });
        }

        const btnClose = document.getElementById('btnCloseControls');
        if (btnClose) {
            btnClose.addEventListener('click', () => closeSidebar());
        }

        if (btnSide) {
            btnSide.addEventListener('click', () => openSidebar());
        }

        if (backdrop) {
            backdrop.addEventListener('click', () => closeSidebar());
        }

        // --- CONTROLES TÁCTILES PARA CELULARES Y TABLETS ---
        const btnLeft = document.getElementById('btnTouchLeft');
        const btnRight = document.getElementById('btnTouchRight');
        const btnJump = document.getElementById('btnTouchJump');
        const btnAction = document.getElementById('btnTouchAction');
        const btnShoot = document.getElementById('btnTouchShoot');
        const btnMap = document.getElementById('btnTouchMap');

        const bindTouch = (elem, keyName) => {
            if (!elem) return;
            elem.addEventListener('touchstart', (e) => {
                e.preventDefault();
                keys[keyName] = true;
                window.soundManager.ensureActive();
            }, { passive: false });

            elem.addEventListener('touchend', (e) => {
                e.preventDefault();
                keys[keyName] = false;
            }, { passive: false });

            elem.addEventListener('mousedown', (e) => {
                keys[keyName] = true;
                window.soundManager.ensureActive();
            });

            elem.addEventListener('mouseup', (e) => {
                keys[keyName] = false;
            });
        };

        bindTouch(btnLeft, 'left');
        bindTouch(btnRight, 'right');
        bindTouch(btnJump, 'up');        // Saltar
        bindTouch(btnAction, 'action'); // Machete
        bindTouch(btnShoot, 'shoot');   // Fusil

        // Botón táctil ▲ = Apuntar hacia arriba
        const btnAimUp = document.getElementById('btnTouchAimUp');
        if (btnAimUp) {
            btnAimUp.addEventListener('touchstart', (e) => {
                e.preventDefault();
                keys.aimUp = true;
                btnAimUp.classList.add('active');
                window.soundManager.ensureActive();
            }, { passive: false });
            btnAimUp.addEventListener('touchend', (e) => {
                e.preventDefault();
                keys.aimUp = false;
                btnAimUp.classList.remove('active');
            }, { passive: false });
            btnAimUp.addEventListener('mousedown', () => { keys.aimUp = true; btnAimUp.classList.add('active'); });
            btnAimUp.addEventListener('mouseup', () => { keys.aimUp = false; btnAimUp.classList.remove('active'); });
        }

        if (btnMap) {
            btnMap.addEventListener('click', (e) => {
                e.preventDefault();
                openCampaignMap();
            });
            btnMap.addEventListener('touchend', (e) => {
                e.preventDefault();
                openCampaignMap();
            }, { passive: false });
        }

        // --- BOTÓN MAPA EN EL ENCABEZADO ---
        const btnOpenMap = document.getElementById('btnOpenMap');
        if (btnOpenMap) {
            btnOpenMap.addEventListener('click', () => {
                openCampaignMap();
            });
        }

        const btnCloseMap = document.getElementById('btnCloseMap');
        if (btnCloseMap) {
            btnCloseMap.addEventListener('click', () => {
                closeCampaignMap();
            });
        }

        const btnModalMap = document.getElementById('btnModalMap');
        if (btnModalMap) {
            btnModalMap.addEventListener('click', () => {
                const modal = document.getElementById('dialogueModal');
                if (modal) modal.classList.remove('active');
                openCampaignMap();
            });
        }

        const btnGameOverMap = document.getElementById('btnGameOverMap');
        if (btnGameOverMap) {
            btnGameOverMap.addEventListener('click', () => {
                const modal = document.getElementById('gameOverModal');
                if (modal) modal.classList.remove('active');
                openCampaignMap();
            });
        }

        // Interacción con los nodos del mapa de campaña
        for (let i = 0; i < HISTORICAL_LEVELS.length; i++) {
            const nodeElem = document.getElementById(`mapNode${i}`);
            if (nodeElem) {
                nodeElem.addEventListener('click', () => {
                    if (i <= maxUnlockedLevel) {
                        closeCampaignMap();
                        lives = 3;
                        setupLevel(i);
                        window.soundManager.play('dialogueNext');
                    } else {
                        window.soundManager.play('playerHit');
                    }
                });
            }
        }

        // --- BOTONES DE MODALES ---
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

        const btnRetry = document.getElementById('btnRetry');
        if (btnRetry) {
            btnRetry.addEventListener('click', () => {
                const gameOverModal = document.getElementById('gameOverModal');
                if (gameOverModal) gameOverModal.classList.remove('active');
                lives = 3;
                setupLevel(currentLevelIndex);
            });
        }

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
        gameLoop();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
