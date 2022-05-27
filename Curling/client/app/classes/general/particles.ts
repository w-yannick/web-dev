import { Settings } from '../global/settings';

export class Particles {

    private scene: THREE.Scene;
    private particles = new Array<Array<THREE.Mesh>>();
    private creationInterval: NodeJS.Timer;

    public init(scene: THREE.Scene) {
        this.scene = scene;
        this.createParticles();
    }

    public clean() {
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = 0; j < 4; j++) {
                this.scene.remove(this.particles[i][j]);
            }
        }
        clearInterval(this.creationInterval);
    }

    public createParticles() {
        let textureLoader = new THREE.TextureLoader();
        let texture = textureLoader.load("assets/images/particle.png");

        let particles = new Array<Array<THREE.Mesh>>();
        let speeds = new Array<number>();

        let particleCount = 0;

        // gradually create the particles
        this.creationInterval = setInterval(() => {

            let particle = new Array<THREE.Mesh>();

            let x = Math.random() * 2 * Settings.HALF_ARENA_WIDTH - Settings.HALF_ARENA_WIDTH;
            let y = Math.random() * Settings.PARTICLE_Y_MAX;
            let z = Settings.PARTICLE_Z_MAX;

            const PARTICLE_SIZE = 0.1;
            for (let i = 0; i < 4; i++) { // we make a star out of four planes
                let plane = new THREE.Mesh(
                    new THREE.PlaneGeometry(PARTICLE_SIZE, PARTICLE_SIZE),
                    new THREE.MeshBasicMaterial({ map: texture, transparent: true })
                );
                particle.push(plane);
                this.scene.add(plane);

                plane.rotateZ(Math.PI * (i / 4));
                plane.rotateX(Math.PI / 2);

                plane.position.set(x, y, z);
            }
            particles.push(particle);
            this.particles.push(particle);

            let speed = 0.05 + 0.06 * Math.random();
            speeds.push(speed);

            if (++particleCount === Settings.PARTICLE_COUNT) {
                clearInterval(this.creationInterval);
            }
        }, Settings.ANIMATION_TIME / Settings.PARTICLE_COUNT);

        // make the particles fall
        let update = setInterval(() => {
            for (let i = 0; i < particles.length; i++) {
                let newZ = Math.max(particles[i][0].position.z - speeds[i], 0);
                for (let j = 0; j < 4; j++) {
                    particles[i][j].position.z = newZ;
                }
                if (newZ === 0) {
                    particles.splice(i, 1);
                    speeds.splice(i, 1);
                }
            }
        }, 50);

        setTimeout(() => { clearInterval(update); }, 15000);
    }

}
