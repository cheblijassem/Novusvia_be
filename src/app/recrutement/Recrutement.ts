export class Recrutement {
    constructor(
        public id: number,
        public genre: string,
        public prenom: string,
        public nom: string,
        public pays: string,
        public ville: string,
        public adresse: string,
        public codePostal: string,
        public email: string,
        public telephone: string,
        public ad: any,
        public motivation: string,
        public etat: boolean,
        public cv: string,
        public approved: any,
        public sujet: string,
        public profile: string) { }
}
