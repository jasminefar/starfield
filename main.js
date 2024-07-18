(function() {
    const canvas = document.querySelector('canvas');
    const ctx = canvas.getContext('2d');
    const stars = [];
    const maxStars = 1000;
    let width, height;
    let speed = 0.2;
    let mode = 'normal';

    function init() {
        resizeCanvas();
        createStars();
        animate();
        addEventListeners();
        window.addEventListener('resize', resizeCanvas, false);
    }

    function resizeCanvas() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }

    function createStars() {
        for (let i = 0; i < maxStars; i++) {
            stars.push(new Star());
        }
    }

    function Star() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.z = Math.random() * width;
        this.radius = 1;
        this.color = `rgba(255, 255, 255, ${Math.random()})`;
    }

    Star.prototype.draw = function() {
        const x = (this.x - width / 2) * (width / this.z);
        const y = (this.y - height / 2) * (width / this.z);
        const radius = (width / this.z) * this.radius;

        ctx.beginPath();
        ctx.arc(x + width / 2, y + height / 2, radius, 0, 2 * Math.PI);
        ctx.fillStyle = this.color;
        ctx.fill();
    };

    Star.prototype.update = function() {
        this.z -= speed;
        if (this.z <= 0) {
            this.z = width;
        }

        if (mode === 'colorful') {
            this.color = `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, ${Math.random()})`;
        }
    };

    function animate() {
        ctx.clearRect(0, 0, width, height);
        stars.forEach(star => {
            star.update();
            star.draw();
        });
        requestAnimationFrame(animate);
    }

    function addEventListeners() {
        canvas.addEventListener('mousemove', (e) => {
            speed = (e.clientX / width) * 2;
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'c') {
                mode = mode === 'normal' ? 'colorful' : 'normal';
            }
        });
    }

    init();
})();
