import React, { useState } from "react";
import Button from "../../ui/Button";
import CreateCabinForm from "./CreateCabinForm";
import Modal from "../../ui/Modal";

export default function AddCabin() {
  return (
    <div>
      <Modal>
        <Modal.open opens={"Add-cabin"}>
          <Button>Add new Cabin</Button>
        </Modal.open>
        <Modal.window name={"Add-cabin"}>
          <CreateCabinForm />
        </Modal.window>
      </Modal>
    </div>
  );
}

// export default function AddCabin() {
//   const [showForm, setShowForm] = useState(false);

//   return (
//     <div>
//       <Button onClick={() => setShowForm((show) => !show)}>
//         Add new cabin
//       </Button>
//       {showForm && (
//         <Modal>
//           <CreateCabinForm />
//         </Modal>
//       )}
//     </div>
//   );
// }
