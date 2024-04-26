import React, { useState, useEffect } from "react";
import AdminPanel from "./AdminPanel";
import {
  Grid,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleIcon from "@mui/icons-material/AddCircle";

import ProblemListItem from "./ProblemListItem";
import axios from "axios";
import "./Admin.css";
import data from "../../leetcode_challenges.json";
import AddModal from "./AddModal/AddModal";
import WarningModal from "./WarningModal/WarningModal";
import CircularProgress from "@mui/material/CircularProgress";
import EditIcon from "@mui/icons-material/Edit";
import EditModal from './EditModal/EditModal'

function AdminView() {
  //We set this state from getting data from the API
  const [itemsToAdd, setItemsToAdd] = useState([]);
  //We set this state when one of the items in the list changes (removing from DB)
  const [itemsToRemove, setItemsToRemove] = useState([]);

  const [open, setOpen] = useState(false); // State to manage modal open/close

  const [openWarning, setOpenWarning] = useState(false); // State to manage modal open/close

  const [openEdit, setOpenEdit] = useState(false); 

  const [itemToRemove, setItemToRemove] = useState(null);

  const [loading, setLoading] = useState(true);

  const [currentItem, setCurrentItem] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://codecrew-leetcode-api.onrender.com/problems"
        );
        setItemsToAdd(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  console.log("itemsToAdd:", itemsToAdd);

  const handleRemoveItem = (item) => {};
  // Set open state to true to show the modal
  const handleAddItem = () => {
    setOpen(true);
  };

  // Set open state to false to hide the modal
  const handleClose = () => {
    setOpen(false);
  };
  const handleWarningPopup = (item) => {
    setItemToRemove(item); // Set the item to remove
    setOpenWarning(true); // Open the warning modal
  };

  const handleEditPopup = (item) => {
    setOpenEdit(true);
    setCurrentItem(item); // Set the current item

  };
  const handleCloseEditModal = () => {
    setOpenEdit(false);
  }
  const handleCloseWarningModal = () => {
    setOpenWarning(false);
  };

  return (
    <div className="adminPage">
      <div className="contentContainer">
        {loading ? (
          <div className="loadingContainer">
            <div className="spinnerWrapper">
              <CircularProgress size="100px" />
            </div>
          </div>
        ) : (
          <>
            <div className="addProblemButtonContainer">
              <button onClick={handleAddItem} className="addProblemButton">
                <h1>Add Problem</h1>
              </button>
            </div>
            <AddModal
              open={open}
              handleOpen={handleAddItem}
              handleClose={handleClose}
              setItemsToAdd={setItemsToAdd}
            />
            <WarningModal
              open={openWarning}
              handleClose={handleCloseWarningModal}
              itemToRemove={itemToRemove}
              setItemsToAdd={setItemsToAdd}
            />
            <EditModal
            open={openEdit}
            handleClose={handleCloseEditModal}
            setItemsToAdd={setItemsToAdd}
            currentItem={currentItem}
            >
            </EditModal>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <AdminPanel id="addProblem" className="AdminPanel">
                  <List>
                    {itemsToAdd.map((item) => (
                      <ListItem key={item.questionFrontendId}>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            width: "100%",
                          }}
                        >
                          <div
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <IconButton aria-label="add">
                              <AddCircleIcon />
                            </IconButton>
                            <ProblemListItem title={item.title} />
                          </div>
                          <div
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <IconButton
                              className="editIcon"
                              aria-label="edit"
                              onClick={() => handleEditPopup(item)}
                            >
                              <EditIcon />
                            </IconButton>
                            <IconButton
                              className="deleteIcon"
                              aria-label="delete"
                              onClick={() => handleWarningPopup(item)}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </div>
                        </div>
                      </ListItem>
                    ))}
                  </List>
                </AdminPanel>
              </Grid>
              <Grid item xs={6}>
                <AdminPanel id="removeProblem" className="AdminPanel">
                  <List>
                    {itemsToRemove.map((item) => (
                      <ListItem key={item.questionFrontendId}>
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <IconButton aria-label="delete">
                            <DeleteIcon />
                          </IconButton>
                          <ProblemListItem title={item.title} />
                        </div>
                      </ListItem>
                    ))}
                  </List>
                </AdminPanel>
              </Grid>
            </Grid>
          </>
        )}
      </div>
    </div>
  );
}

export default AdminView;
