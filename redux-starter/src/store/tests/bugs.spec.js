// Social Test.
import { addBug } from "../bugs";
import configureStore from "../configureStore";

describe("Bug Slice", () => {
    it("should handle addBug action", async () => {
        const bug = { description: 'a' };
        const store = configureStore();
        await store.dispatch(addBug(bug));
        expect(store.getState().entities.bugs.list).toHaveLength(1);
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