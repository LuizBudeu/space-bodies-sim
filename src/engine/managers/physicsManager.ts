import Planet from "../bodies/planet";
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
            const totalForce = new Vector(0, 0);
            for (const otherPlanet of this.planets) {
                if (planet !== otherPlanet) {
                    // Calculate gravitational force between the two planets
                    const force = this.calculateGravitationalForce(planet, otherPlanet);
                    // Add the force to the total force acting on the planet
                    totalForce.add(force);
                }
            }
            // Apply the total force to the planet
            planet.applyForce(totalForce);
        }
    }

    private calculateGravitationalForce(planet1: Planet, planet2: Planet): Vector {
        const G = 1; // gravitational constant
        const distance = planet1.position.distanceTo(planet2.position);

        if (distance === 0) {
            return new Vector(0, 0);
        }

        const forceMagnitude = (G * planet1.params.mass * planet2.params.mass) / Math.pow(distance, 2);
        const direction = Vector.sub(planet2.position, planet1.position).normalize();
        const force = direction.mul(forceMagnitude);
        return force;
    }
}

export default PhysicsManager;
