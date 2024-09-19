var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const baseUrl = "https://66e9905787e417609449f8bc.mockapi.io/api/v1";
// GET ALL TODO'S
const getAll = () => __awaiter(this, void 0, void 0, function* () {
    const response = yield fetch(`${baseUrl}/todos`);
    const data = yield response.json();
    console.log(data);
});
// CREATE NEW TODO
const addTodo = (newTodo) => __awaiter(this, void 0, void 0, function* () {
    const response = yield fetch(`${baseUrl}/todos`, {
        method: "POST",
        body: JSON.stringify(newTodo)
    });
});
getAll();
//# sourceMappingURL=index.js.map