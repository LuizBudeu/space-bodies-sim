import Planet from "../bodies/planet";
import Settings from "../settings";
import Vector from "../utils/vector";

class PhysicsManager {
    planets: Planet[];

    constructor(planets: Planet[]) {
        this.planets = planets;
    }

    addPlanet(planet: Planet): void {
        this.planets.push(planet);
    }

    solveSystem(): void {
        for (const planet of this.planets) {
            let totalForce = new Vector(0, 0);
            for (const otherPlanet of this.planets) {
                if (planet !== otherPlanet) {
                    // Check for collision
                    if (this.checkCollision(planet, otherPlanet)) {
                        this.resolveCollision(planet, otherPlanet);
                    } else {
                        // Calculate gravitational force between the two planets
                        const force = this.calculateGravitationalForce(planet, otherPlanet);
                        // Add the force to the total force acting on the planet
                        totalForce = totalForce.add(force);
                    }
                }
            }
            // Apply the total force to the planet
            planet.applyForce(totalForce);
        }
    }

    private calculateGravitationalForce(planet1: Planet, planet2: Planet): Vector {
        const G = Settings.GRAVITATIONAL_CONSTANT;
        const distance = planet1.position.distanceTo(planet2.position);

        if (distance === 0) {
            return new Vector(0, 0);
        }

        const forceMagnitude = (G * planet1.params.mass * planet2.params.mass) / distance ** 2;
        const direction = planet2.position.sub(planet1.position).normalize();
        const force = direction.mul(forceMagnitude);
        return force;
    }

    private checkCollision(planet1: Planet, planet2: Planet): boolean {
        const distance = planet1.position.distanceTo(planet2.position);
        return distance <= planet1.circle.getRadius() + planet2.circle.getRadius();
    }

    private resolveCollision(planet1: Planet, planet2: Planet): void {
        const normal = planet2.position.sub(planet1.position).normalize();
        const relativeVelocity = planet2.velocity.sub(planet1.velocity);
        const velocityAlongNormal = relativeVelocity.dot(normal);

        // Do not resolve if velocities are separating
        if (velocityAlongNormal > 0) return;

        const restitution = Settings.COEFFICIENT_OF_RESTITUTION;
        const impulseScalar = (-(1 + restitution) * velocityAlongNormal) / (1 / planet1.params.mass + 1 / planet2.params.mass);

        const impulse = normal.mul(impulseScalar);
        planet1.velocity = planet1.velocity.sub(impulse.div(planet1.params.mass));
        planet2.velocity = planet2.velocity.add(impulse.div(planet2.params.mass));
    }
}

export default PhysicsManager;
