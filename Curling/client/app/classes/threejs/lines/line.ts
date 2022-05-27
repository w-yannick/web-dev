export abstract class Line {

    protected name: string;
    protected start: THREE.Vector3;
    protected end: THREE.Vector3;
    protected color: number;
    protected lineWidth: number;
    protected isDashed: boolean;

    private geometry: THREE.Geometry;
    private material: any;
    private line: THREE.Line;

    public init(scene: THREE.Scene): void {
        this.geometry = new THREE.Geometry();
        this.geometry.vertices.push(this.start);
        this.geometry.vertices.push(this.end);
        this.geometry.computeLineDistances();

        if (this.isDashed) {
            this.material = new THREE.LineDashedMaterial({
                color: this.color,
                linewidth: this.lineWidth,
                dashSize: 0.5,
                gapSize: 0.5,
                scale: 1
            });
        }
        else {
            this.material = new THREE.LineBasicMaterial({
                color: this.color,
                linewidth: this.lineWidth
            });
        }

        this.line = new THREE.Line(this.geometry, this.material);
        this.line.name = this.name;

        scene.add(this.line);
    }

    public updateLineStart(): void {
        this.geometry.vertices[0] = this.start;
        this.geometry.verticesNeedUpdate = true;
        this.geometry.computeLineDistances();
        this.geometry.lineDistancesNeedUpdate = true;
    }

    public updateLineEnd(): void {
        this.geometry.vertices[1] = this.end;
        this.geometry.verticesNeedUpdate = true;
        this.geometry.computeLineDistances();
        this.geometry.lineDistancesNeedUpdate = true;
    }

    public setStart(start: THREE.Vector3): void {
        this.start = start;
    }

    public setEnd(end: THREE.Vector3): void {
        this.end = end;
    }

    public getMaterial() {
        return this.material;
    }

    public getLine(): THREE.Line {
        return this.line;
    }

    public getIsDashed(): boolean {
        return this.isDashed;
    }

    public getGeometry(): THREE.Geometry {
        return this.geometry;
    }

    public getStart(): THREE.Vector3 {
        return this.start;
    }

    public getEnd(): THREE.Vector3 {
        return this.end;
    }

}
