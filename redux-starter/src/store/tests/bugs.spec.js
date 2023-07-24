import { apiCallBegan } from "../api";
import { addBug, bugAdded } from "../bugs";

describe("Bug Slice", () => {
    describe("Action Creators", () => {
        it("Add Bug", () => {
            const bug = { description: 'a' };
            const result = addBug(bug);
            const expected = {
                type: apiCallBegan.type,
                payload: {
                    url: '/bugs',
                    method: 'post',
                    data: bug,
                    onSuccess: bugAdded.type
                }
            }
            expect(result).toEqual(expected)
        })
    })
})