export type Classes = {
    layout?: string;
    sizing?: string;
    spacing?: string;
    border?: string;
    typo?: string;
    pseudo?: string;
    effect?: string;
    interactivity?: string;
    background?: string;
    transition?: string;
    animation?: string;
    filter?: string;
    table?: string;
    transform?: string;
    svg?: string;
};

export type Breakpoints = {
    "2xl"?: Classes;
    xl?: Classes;
    lg?: Classes;
    md?: Classes;
    sm?: Classes;
};

export type Styles = Classes & {
    responsive?: Breakpoints;
    hover?: Classes;
    focus?: Classes;
    active?: Classes;
    before?: Classes;
    after?: Classes;
    "first-child"?: Classes;
    required?: Classes;
    valid?: Classes;
    invalid?: Classes;
    disabled?: Classes;
    placeholder?: Classes;
    first?: Classes;
    last?: Classes;
    odd?: Classes;
    even?: Classes;
    file?: Classes;
    selection?: Classes;
    backdrop?: Classes;
};

export type TailwindStylesheet = Record<string, Styles>;

export type Stylesheet = Record<string, string>;
