let lastId = 0;

export default function reducer(state = [], action) {
    switch (action.type) {
        case 'bugAdded':
            return [
                ...state,
                {
                    id: ++lastId,
                    decription: action.payload.decription,
                    resolved: false,
                }
            ]
        case 'bugRemoved':
            return state.filter(bug => bug.id !== action.payload.id);
        default:
            return state;
    }
}