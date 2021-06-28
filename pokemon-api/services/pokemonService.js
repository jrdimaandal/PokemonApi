const lowdb = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('../pokemon.json');
const db = lowdb(adapter);

db.defaults({ pokemons: [] }).write();

exports.get = (name) => {

    if (name?.trim()){
        const currentItem =
        db
            .get('pokemons')
            .value()
            .filter((_) => _.name.toLowerCase() === name.toLowerCase());

        return currentItem;
    }

    const pokemons = db.get('pokemons').value();
    return pokemons;
};

exports.insert = (pokemon) => {
    const { name } = pokemon;

    const isPokemonExist =
        db
            .get('pokemons')
            .value()
            .filter((_) => _.name === name).length > 0;

    if (isPokemonExist) {
        return {
            success: false,
            errorMessage: `Pokemon ${name} already exist.`,
        };
    }

    db.get('pokemons').push(pokemon).write();

    return {
        success: true,
    };
};

exports.delete = (name) => {

    if (!name.trim()) {
        return {
            success: false,
            errorMessage: `Pokemon name can't be blank.`,
        };
    }

    const pokemon = db
        .get('pokemons')
        .value()
        .filter((_) => _.name === name);
    
    const isPokemonExist = pokemon.length > 0;

    if (!isPokemonExist) {
        return {
            success: false,
            errorMessage: `Pokemon ${name} does not exist.`,
        };
    }

    db.get('pokemons').remove(pokemon[0]).write();

    return {
        success: true,
    };
};

exports.update = (name, pokemon) => {
    const { type, generation } = pokemon;
    if (!type) {
        return {
            success: false,
            errorMessage: 'Update fail, type property is missing',
        };
    }

    const isPokemonExist =
        db
            .get('pokemons')
            .value()
            .filter((_) => _.name === name).length > 0;

    if (!isPokemonExist) {
        return {
            success: false,
            errorMessage: `Pokemon ${name} does not exist.`,
        };
    }

    if (!generation) {
        db.get('pokemons')
        .find({name: name})
        .assign({ type: type })
        .value();
    } else {
        db.get('pokemons')
        .find({name: name})
        .assign({ type: type, generation: generation  })
        .value();
    }

    return {
        success: true,
    };
};