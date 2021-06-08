const PG_ACTIONS = {
    SET: 'SET_PROGRAM',
}

export const setProgram = program => ({
    type: PG_ACTIONS.SET,
    program
})
