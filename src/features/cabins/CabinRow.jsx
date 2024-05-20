// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import styled from "styled-components";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";

import { formatCurrency } from "../../utils/helpers";
import CreateCabinForm from "./CreateCabinForm";
import { useCreateCabin, useDeleteCabin } from "./useCabin";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";

// const TableRow = styled.div`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;
//   padding: 1.4rem 2.4rem;

//   &:not(:last-child) {
//     border-bottom: 1px solid var(--color-grey-100);
//   }
// `;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

// eslint-disable-next-line react/prop-types
export default function CabinRow({ cabin }) {
  const { isCreating, createCabin } = useCreateCabin();
  // eslint-disable-next-line react/prop-types
  const { id, image, regularPrice, name, discount, maxCapacity, description } =
    cabin;

  function handelDublicate() {
    createCabin({
      name: `copy of ${name}`,
      image,
      regularPrice,
      discount,
      maxCapacity,
      description,
    });
  }

  const { isDeleting, deleteCabin } = useDeleteCabin();
  return (
    <>
      <Table.row>
        <Img src={image || "default-cabin.png"} alt={name} />
        <Cabin>{name}</Cabin>
        <div> fit up to {maxCapacity} guests </div>
        <Price> {formatCurrency(regularPrice)} </Price>
        <Discount> {discount ? formatCurrency(discount) : "_"} </Discount>
        <div>
          <Modal>
            <Modal.window name="edite">
              <CreateCabinForm editeData={cabin} />
            </Modal.window>

            <Menus.menu>
              <Menus.toggle toggleId={cabin.id} />

              <Menus.list listId={cabin.id}>
                <Menus.button
                  disabled={isCreating}
                  icon={<HiSquare2Stack />}
                  onClick={handelDublicate}
                >
                  Dublicated
                </Menus.button>

                <Modal.open opens="edite">
                  <Menus.button icon={<HiPencil />}>Edite</Menus.button>
                </Modal.open>

                <Modal.open opens="delete">
                  <Menus.button icon={<HiTrash />}>Delete</Menus.button>
                </Modal.open>
              </Menus.list>
            </Menus.menu>

            <Modal.window name="delete">
              <ConfirmDelete
                resourceName="cabins"
                disabled={isDeleting}
                onConfirm={() => deleteCabin(cabin.id)}
              />
            </Modal.window>
          </Modal>
        </div>
      </Table.row>
    </>
  );
}
