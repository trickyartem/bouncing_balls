class Utils {
    static randomIntFromRange(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

    static randomColor(col: string[]) {
        return col[Math.floor(Math.random() * col.length)]
    }
}

export default Utils;
