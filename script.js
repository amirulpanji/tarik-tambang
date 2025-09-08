let ropePosition = 50; // Posisi tengah (50%)
        let redScore = 0;
        let blueScore = 0;
        let gameActive = true;
        let pullCooldown = false;

        // Elemen DOM
        const rope = document.getElementById('rope');
        const progressBar = document.getElementById('progressBar');
        const gameField = document.getElementById('gameField');
        const teamLeft = document.getElementById('teamLeft');
        const teamRight = document.getElementById('teamRight');
        const gameOver = document.getElementById('gameOver');
        const winnerText = document.getElementById('winnerText');
        const redScoreEl = document.getElementById('redScore');
        const blueScoreEl = document.getElementById('blueScore');

        // Fungsi untuk memperbarui posisi tali
        function updateRopePosition() {
            // Update progress bar
            progressBar.style.width = ropePosition + '%';
            
            // Update posisi visual tali
            const ropeContainer = rope.parentElement;
            ropeContainer.style.transform = `translateY(-50%) translateX(${(ropePosition - 50) * 2}px)`;
            
            // Check win condition
            if (ropePosition <= 0) {
                endGame('TIM MERAH MENANG! 🔴');
                redScore++;
                redScoreEl.textContent = redScore;
            } else if (ropePosition >= 100) {
                endGame('TIM BIRU MENANG! 🔵');
                blueScore++;
                blueScoreEl.textContent = blueScore;
            }
        }

        // Fungsi untuk menarik tali
        function pullRope(direction) {
            if (!gameActive || pullCooldown) return;
            
            pullCooldown = true;
            setTimeout(() => pullCooldown = false, 100); // Cooldown 100ms
            
            if (direction === 'left') {
                ropePosition = Math.max(0, ropePosition - 2);
                teamLeft.classList.add('pulling');
                setTimeout(() => teamLeft.classList.remove('pulling'), 200);
            } else if (direction === 'right') {
                ropePosition = Math.min(100, ropePosition + 2);
                teamRight.classList.add('pulling');
                setTimeout(() => teamRight.classList.remove('pulling'), 200);
            }
            
            updateRopePosition();
        }

        // Fungsi untuk mengakhiri game
        function endGame(winner) {
            gameActive = false;
            winnerText.textContent = winner;
            gameOver.style.display = 'flex';
            
            // Tambahkan efek kemenangan
            gameField.style.animation = 'celebration 1s ease-in-out';
        }

        // Fungsi untuk restart game
        function restartGame() {
            ropePosition = 50;
            gameActive = true;
            gameOver.style.display = 'none';
            gameField.style.animation = '';
            updateRopePosition();
        }

        // Event listener untuk keyboard
        document.addEventListener('keydown', function(event) {
            const key = event.key.toLowerCase();
            
            if (key === 'a') {
                pullRope('left');
            } else if (key === 'l') {
                pullRope('right');
            }
        });

        // Event listener untuk touch/mobile (opsional)
        teamLeft.addEventListener('click', () => pullRope('left'));
        teamRight.addEventListener('click', () => pullRope('right'));

        // Inisialisasi game
        updateRopePosition();

        // Tambahkan efek drift alami
        setInterval(() => {
            if (gameActive && Math.random() < 0.05) { // 5% chance setiap interval
                const drift = (Math.random() - 0.5) * 0.5;
                ropePosition = Math.max(0, Math.min(100, ropePosition + drift));
                updateRopePosition();
            }
        }, 500);

        // Tambahkan CSS untuk efek kemenangan
        const style = document.createElement('style');
        style.textContent = `
            @keyframes celebration {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.02); }
            }
        `;
        document.head.appendChild(style);