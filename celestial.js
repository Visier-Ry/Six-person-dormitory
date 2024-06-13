import * as THREE from "three";


class Celestial {
    constructor(name, diameter, radius, mass, color = 0x00ff00, k = 0.1, context = '',id=0) {
        this.name = name;
        this.diameter = diameter;
        this.radius = radius;
        this.mass = mass;
        this.color = color;
        this.t = 0;
        this.k = k;
        this.text=context;
        this.id=id;
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        // const geometry = new THREE.SphereGeometry(radius, diameter * 10, diameter * 10);
        const material = [
            new THREE.MeshBasicMaterial({color: 'black'}), // right
            new THREE.MeshBasicMaterial({color: 'black'}), // left
            new THREE.MeshBasicMaterial({color: 'black'}), // top
            new THREE.MeshBasicMaterial({color: 'black'}), // bottom
            new THREE.MeshBasicMaterial({color: 'black'}), // back
            new THREE.MeshBasicMaterial({map: new THREE.CanvasTexture(this.getTextCanvas())}) // front
        ]
        // 白色边棱
        var wireframeGeometry = new THREE.EdgesGeometry(geometry); // 提取边棱
        var wireframeMaterial = new THREE.LineBasicMaterial({color: 0xffffff});
        new THREE.LineSegments(wireframeGeometry, wireframeMaterial);
        this.sphere = new THREE.Mesh(geometry, material);
        // this.sphere = new THREE.LineSegments(wireframeGeometry, wireframeMaterial);

        this.sphere.position.x = this.id-3;
    }


// CanvasTexture
    getTextCanvas() {
        var width = 512, height = 512;
        var canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        var ctx = canvas.getContext('2d');
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, width, height);
        ctx.font = 256 + 'px " bold';
        ctx.fillStyle = '#28ffe6';
        ctx.fillText(`${this.text}`, 0,height/3*2);

        return canvas;
    }

    jump() {

    }

    run() {
        this.sphere.rotation.x += 0.01;
        this.sphere.rotation.y += 0.01;
        this.t += 0.1;
        this.sphere.position.x += this.k * Math.sin(this.t);
        this.sphere.position.y += this.k * Math.cos(this.t);
    }
}

class star {
    constructor(Half_major_axis, eccentricity, orbit_inclination_angle, perigee_angle_distance, ascending_node_right_ascension, true_perigee_angle, operating_cycles) {
        this.Half_major_axis = Half_major_axis;
        this.eccentricity = eccentricity;
        this.orbit_inclination_angle = orbit_inclination_angle;
        this.perigee_angle = perigee_angle_distance;
        this.ascending_node_right_ascension = ascending_node_right_ascension;
        this.true_perigee_angle = true_perigee_angle;
        this.operating_cycles = operating_cycles;
    }
}

export {Celestial}