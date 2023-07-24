// Social Test.
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { addBug } from "../bugs";
import configureStore from "../configureStore";

describe("Bug Slice", () => {
    let fakeAxios;
    let store;

    beforeEach(() => {
        fakeAxios = new MockAdapter(axios);
        store = configureStore();
    })

    const bugSlice = () => store.getState().entities.bugs

    it("should add bug to the store if it's save to server", async () => {
        const bug = { description: 'a' };
        const saveBug = { ...bug, id: 1 };
        fakeAxios.onPost('/bugs').reply(200, saveBug);

        await store.dispatch(addBug(bug));

        expect(bugSlice().list).toContainEqual(saveBug);
    });

    it("should not add bug to the store if it's not save to server", async () => {
        const bug = { description: 'a' };
        fakeAxios.onPost('/bugs').reply(500);

        await store.dispatch(addBug(bug));

        expect(bugSlice().list).toHaveLength(0);
    });
})



// Solitary Test.
// import { apiCallBegan } from "../api";
// import { addBug, bugAdded } from "../bugs";

// describe("Bug Slice", () => {
//     describe("Action Creators", () => {
//         it("Add Bug", () => {
//             const bug = { description: 'a' };
//             const result = addBug(bug);
//             const expected = {
//                 type: apiCallBegan.type,
//                 payload: {
//                     url: '/bugs',
//                     method: 'post',
//                     data: bug,
//                     onSuccess: bugAdded.type
//                 }
//             }
//             expect(result).toEqual(expected)
//         })
//     })
// })