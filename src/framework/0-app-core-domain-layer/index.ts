import { ZodType, z } from "zod";

export class DomainObjectServiceBuilder<
    T extends ZodType
> {
    #schema: T;
    #defaultValueFactory?: ()=>z.infer<T>;
    #randomValueFactory?: ()=>z.infer<T>;
    constructor(schema: T) {
        this.#schema = schema;
    }
    setDefaultValueFactory(defaultValueFactory: ()=>z.infer<T>) {
        this.#defaultValueFactory = defaultValueFactory;
        return this;
    }
    setRandomValueFactory(randomValueFactory: ()=>z.infer<T>) {
        this.#randomValueFactory = randomValueFactory;
        return this;
    }
    build() {
        const validator = (input: unknown) => this.#schema.safeParse(input);
        const defaultValueFactory = this.#defaultValueFactory;
        const randomValueFactory = this.#randomValueFactory;
        return {
            validate: validator,
            makeDefaultValue: defaultValueFactory,
            generateRandomValue: randomValueFactory 
        }
    }
}