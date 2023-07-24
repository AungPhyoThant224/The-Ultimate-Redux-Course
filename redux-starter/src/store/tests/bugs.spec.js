// Social Test.
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { addBug } from "../bugs";
import configureStore from "../configureStore";

describe("Bug Slice", () => {
    it("should handle addBug action", async () => {
        const bug = { description: 'a' };
        const saveBug = { ...bug, id: 1 };

        const fakeAxios = new MockAdapter(axios);
        fakeAxios.onPost('/bugs').reply(200, saveBug);

        const store = configureStore();
        await store.dispatch(addBug(bug));
        expect(store.getState().entities.bugs.list).toContainEqual(saveBug);
    })
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