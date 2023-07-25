// Social Test.
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { addBug, resolveBug, getUnresolvedBugs, loadBugs, assignBugToUser, getBugByUser } from "../bugs";
import configureStore from "../configureStore";

describe("Bug Slice", () => {
    let fakeAxios;
    let store;

    beforeEach(() => {
        fakeAxios = new MockAdapter(axios);
        store = configureStore();
    })

    const bugSlice = () => store.getState().entities.bugs;

    const createState = () => ({
        entities: {
            bugs: {
                list: []
            }
        }
    });

    describe("Loading Bug", () => {
        describe("if the bugs exit in the cache", () => {
            it("they should not be fetch from the server", async () => {
                fakeAxios.onGet('/bugs').reply(200, [{ id: 1 }]);

                await store.dispatch(loadBugs());
                await store.dispatch(loadBugs());

                expect(fakeAxios.history.get.length).toBe(1);
            })
        })

        describe("if the bugs not exit in the cache", () => {
            it("they should be fetch from the server and add to the store", async () => {
                fakeAxios.onGet('/bugs').reply(200, [{ id: 1 }]);

                await store.dispatch(loadBugs());

                expect(bugSlice().list).toHaveLength(1);
            });

            describe("loading indicator", () => {
                it("should be true while fetching from the server", () => {
                    fakeAxios.onGet('/bugs').reply(() => {
                        expect(bugSlice().loading).toBe(true);
                        return (200, [{ id: 1 }])
                    });

                    store.dispatch(loadBugs());
                })

                it("should be false after fetching from the server", async () => {
                    fakeAxios.onGet('/bugs').reply(200, [{ id: 1 }]);

                    await store.dispatch(loadBugs());

                    expect(bugSlice().loading).toBe(false);
                })

                it("should be false if server return error", async () => {
                    fakeAxios.onGet('/bugs').reply(500);

                    await store.dispatch(loadBugs());

                    expect(bugSlice().loading).toBe(false);
                })
            })
        })
    })

    it("should mark the bug as resolved if it's save to server", async () => {
        fakeAxios.onPost('/bugs').reply(200, { id: 1 });
        fakeAxios.onPatch('/bugs/1').reply(200, { id: 1, resolved: true });

        await store.dispatch(addBug({}));
        await store.dispatch(resolveBug(1));

        expect(bugSlice().list[0].resolved).toBe(true);
    })

    it("should not mark the bug as resolved if it's not save to server", async () => {
        fakeAxios.onPost('/bugs').reply(200, { id: 1 });
        fakeAxios.onPatch('/bugs/1').reply(500);

        await store.dispatch(addBug({}));
        await store.dispatch(resolveBug(1));

        expect(bugSlice().list[0].resolved).not.toBe(true);
    })

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

    it("should assign bug to user if it's save to server", async () => {
        fakeAxios.onPost('/bugs').reply(200, { id: 1 });
        fakeAxios.onPatch('/bugs/1').reply(200, { id: 1, userId: 1 });

        await store.dispatch(addBug());
        await store.dispatch(assignBugToUser({ userId: 1, bugId: 1 }));
        expect(bugSlice().list[0].userId).toBe(1);
    })

    it("should not assign bug to user if it's not save to server", async () => {
        fakeAxios.onPost('/bugs').reply(200, { id: 1 });
        fakeAxios.onPatch('/bugs/1').reply(500);

        await store.dispatch(addBug());
        await store.dispatch(assignBugToUser({ userId: 1, bugId: 1 }));
        expect(bugSlice().list[0].userId).not.toBe(1);
    })

    describe("Bug Selectors", () => {
        it("get unresolve bugs", () => {
            const state = createState();
            state.entities.bugs.list = [{ id: 1, resolved: true }, { id: 2 }, { id: 3 }];

            const unresolvedBugs = getUnresolvedBugs(state);

            expect(unresolvedBugs).toHaveLength(2);
        })

        it("get bug by user", () => {
            const state = createState();
            state.entities.bugs.list = [{ id: 1, userId: 1 }, { id: 2 }, { id: 3 }];

            const bugByUser = getBugByUser(1)(state);

            expect(bugByUser).toHaveLength(1)
        })
    })
})

// Solitary Test.
// import { apiCallBegan } from "../api";
// import { addBug, bugAdded } from "../bugs";

// describe("Bug Slice", () => {
//     describe("Action Creators", () => {
//         it("add bug", () => {
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