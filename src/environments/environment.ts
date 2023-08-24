/**
 * Configurações gerais de todo o projeto.
 *
 * Nota-se que  `environment.prod.ts`   é utilizado no build produtivo,
 * enquanto     `environment.ts`        é utilizado apenas para desenvolvimento local.
 */
export const environment = Object.freeze({
    /** Flag que explicita produção vs desenvolvimento. */
    production: true,

    /** Centralização da identidade do projeto. */
    identity: {
        /**
         * Nome do projeto a ser exibido.
         *
         * `ATENÇÃO:` O nome do projeto na tag `<title>` dentro do `index.html` precisar manualmente definido.
         */
        name: 'Mumvock',

        websiteUrl: "mumvock.com",

        /** Endereço do logo exibido no `footer`. */
        srcLogo: 'assets/images/mumvock.com_logo.png',
        srcWhiteLogo: 'assets/images/mumvock.com_white_logo.png',

        /** Slogan */
        slogan: 'Servidor de counter-strike 1.6 — 4FUN simples e bem feito',

        /** Server IP */
        ip: 'hlds.mumvock.com'
    },
    assets: {
        sounds: 'assets/sounds/',
        images: 'assets/images/',
    },
    version: '1.0.05'
});
