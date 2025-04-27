import { Stylesheet, TailwindStylesheet } from "../types/tw";

export function parse(styles: TailwindStylesheet): Stylesheet {
    const stylesheet: Stylesheet = {};

    const traverse = <Type>(obj: Type, classes: string[] = []): string[] => {
        for (const key in obj) {
            const styleProp = obj[key as keyof typeof obj];
            if (typeof styleProp === "string" && styleProp.trim() !== "") {
                classes.push(styleProp.trim());
            } else if (typeof styleProp === "object" && styleProp !== null) {
                traverse(styleProp, classes);
            }
        }
        return classes;
    };

    for (const key in styles) {
        const classes = traverse(styles[key]);
        stylesheet[key] = classes.join(" ");
    }

    return stylesheet;
}
