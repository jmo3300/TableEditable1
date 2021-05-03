import React, { useCallback, useState, useMemo, useEffect } from "react";
import { useFormikContext, getIn } from "formik";
import Table from "./Table";
import Input from "./Input";

const EMPTY_ARR = [];

function Friends({ name, handleAdd, handleRemove }) {
  const { values } = useFormikContext();

  // from all the form values we only need the "friends" part.
  // we use getIn and not values[name] for the case when name is a path like `social.facebook`
  const formikSlice = getIn(values, name) || EMPTY_ARR;
  const [tableRows, setTableRows] = useState(formikSlice);

  // we need this so the table updates after the timeout expires
  useEffect(() => {
    setTableRows(formikSlice);
  }, [formikSlice]);

  const onAdd = useCallback(() => {
    const newState = [...tableRows];
    const item = {
      id: Math.floor(Math.random() * 100) / 10,
      firstName: "",
      lastName: ""
    };

    newState.push(item);
    setTableRows(newState);
    handleAdd(item);
  }, [handleAdd, tableRows]);

  const onRemove = useCallback(
    index => {
      const newState = [...tableRows];

      newState.splice(index, 1);
      setTableRows(newState);
      handleRemove(index);
    },
    [handleRemove, tableRows]
  );

  const columns = useMemo(
    () => [
      {
        Header: "Id",
        accessor: "id"
      },
      {
        Header: "First Name",
        id: "firstName",
        Cell: ({ row: { index } }) => (
          <Input name={`${name}[${index}].firstName`} />
        )
      },
      {
        Header: "Last Name",
        id: "lastName",
        Cell: ({ row: { index } }) => (
          <Input name={`${name}[${index}].lastName`} />
        )
      },
      {
        Header: "Actions",
        id: "actions",
        Cell: ({ row: { index } }) => (
          <button type="button" onClick={() => onRemove(index)}>
            delete
          </button>
        )
      }
    ],
    [name, onRemove]
  );

  return (
    <div className="field">
      <div>
        Friends:{" "}
        <button type="button" onClick={onAdd}>
          add
        </button>
      </div>
      <Table data={tableRows} columns={columns} rowKey="id" />
    </div>
  );
}

export default React.memo(Friends);
