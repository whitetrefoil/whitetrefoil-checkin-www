interface Indexed<T> { [key: string]: T }

type SimpleSet = Indexed<true>;
