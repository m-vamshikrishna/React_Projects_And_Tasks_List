import { useRef } from "react";
import Input from "./Input";
import Modal from "./Modal";

export default function NewProject({ onAdd, onCancel }) {
  const modalRef = useRef();
  const title = useRef();
  const description = useRef();
  const dueDate = useRef();
  function handleSave() {
    const enteredTitle = title.current.value;
    const enteredDesctiption = description.current.value;
    const enteredDueDate = dueDate.current.value;
    if (
      enteredTitle.trim() === "" ||
      enteredDesctiption.trim() === "" ||
      enteredDueDate.trim() === ""
    ) {
      modalRef.current.open();
      return;
    }
    onAdd({
      title: enteredTitle,
      description: enteredDesctiption,
      dueDate: enteredDueDate,
    });
    handleClearInputs();
  }
  function handleClearInputs() {
    title.current.value = "";
    description.current.value = "";
    dueDate.current.value = "";
  }
  return (
    <>
      <Modal ref={modalRef} buttonCaption="Close">
        <h2 className="text-xl font-bold text-stone-700 my-4">Invalid Input</h2>
        <p className="text-stone-600 mb-4">
          Oops... looks like you forgot to enter a Value.
        </p>
        <p className="text-stone-600 mb-4">
          Please Make Sure You Provided a Valid Input
        </p>
      </Modal>
      <div className="w-[35rem] mt-16">
        <menu className="flex items-center justify-end gap-4 my-4">
          <li>
            <button
              className="text-stone-800 hover:text-stone-950"
              onClick={onCancel}
            >
              Cancel
            </button>
          </li>
          <li>
            <button
              onClick={handleSave}
              className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950"
            >
              Save
            </button>
          </li>
        </menu>
        <div>
          <Input ref={title} label="Title" isTextArea={false} />
          <Input ref={description} label="Desctiption" isTextArea={true} />
          <Input
            type="date"
            ref={dueDate}
            label="Due Date"
            isTextArea={false}
          />
        </div>
      </div>
    </>
  );
}
