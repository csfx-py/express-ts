import chalk from 'chalk';

export const checkEnv = (): void => {
    if (!process.env.NODE_ENV) {
        console.error(
            chalk.bgRedBright('[NODE_ENV]'),
            chalk.redBright(
                'process.env.NODE_ENV is not defined. Either define NODE_ENV as'
            ),
            chalk.whiteBright('"development"'),
            chalk.redBright('or'),
            chalk.whiteBright('"production"'),
            chalk.redBright('in'),
            chalk.underline(chalk.redBright('package.json'))
        );
        process.exit(1);
    }

    const warn: Array<keyof NodeJS.ProcessEnv> = [];
    // SUGGESTION + TODO : AFter proper error handling of S3 we can move these cred to warn

    const error: Array<keyof NodeJS.ProcessEnv> = [
        'PORT',
        'DATABASE_URL',
        'SHADOW_DATABASE_URL',
        'JWT_TOKEN_SECRET',
        'JWT_TOKEN_EXPIRES_IN',
    ];

    let isError = false;
    for (const errKey of error) {
        if (!process.env[errKey]) {
            console.error(
                chalk.redBright(
                    `env[${errKey}]: not set in .env file. Please set ${errKey} to initiate server.`
                )
            );
            isError = true;
        }
    }
    if (isError) {
        process.exit(1);
    }

    let isWarn = false;
    for (const warnKey of warn) {
        if (!process.env[warnKey]) {
            console.log(
                chalk.yellowBright(
                    `env[${warnKey}]: not set in .env file. Unexpected behaviour might happen in server. please define values in .env file.`
                )
            );
            isWarn = true;
        }
    }
    if (isWarn && process.env.NODE_ENV !== 'development') {
        console.log(
            chalk.blueBright('Production:'),
            'Please fix all the warnings and errors '
        );
        process.exit(-1);
    }
};
