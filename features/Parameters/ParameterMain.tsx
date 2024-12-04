"use client";
import Grid from "@mui/material/Grid2";
import DeleteIcon from "@mui/icons-material/Delete";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import NoMeetingRoomIcon from "@mui/icons-material/NoMeetingRoom";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import LogoutIcon from "@mui/icons-material/Logout";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import { BookClassy, Category } from "@/lib/types/types";
import { useState, useEffect } from "react";
import { handleResponseMsg } from "@/utils/toast-helper";
import { toast } from "react-toastify";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  addCategoryToType,
  addNewType,
  deleteCategory,
  deleteType,
} from "@/app/actions/action";
import {
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  Fab,
} from "@mui/material";

interface ParameterMainProps {
  bookClassies: BookClassy[];
}

const ParameterMain = ({ bookClassies }: ParameterMainProps) => {
  const [newType, setNewType] = useState<string>("");
  const [showCategories, setShowCategories] = useState<boolean>(false);
  const [selectedType, setSelectedType] = useState<string>("");
  const [newCategory, setNewCategory] = useState<string>("");
  const [categories, setCategories] = useState<Category[]>([]);
  const router = useRouter();
  const navigateToHome = () => router.push("/");
  const navigateToRegister = () => router.push("/register");

  useEffect(() => {
    if (selectedType) {
      const typeData = bookClassies.find((item) => item.type === selectedType);
      setCategories(typeData ? typeData.categories : []);
    }
    setShowCategories(true);
  }, [selectedType]);

  const handleAddType = async () => {
    try {
      const res = await addNewType(newType);
      handleResponseMsg(res);
      setNewType("");
    } catch (error) {
      toast.error("Tür Eklenemedi, Bir hata oluştu: " + error);
    }
  };

  const handleDeleteType = async (bookClassyId: string) => {
    try {
      const res = await deleteType(bookClassyId);
      handleResponseMsg(res);
      setNewType("");
    } catch (error) {
      toast.error("Tür Eklenemedi, Bir hata oluştu: " + error);
    }
  };

  const handleToggleCategories = (type: string) => {
    if (selectedType === type) {
      setShowCategories(!showCategories);
    } else {
      setSelectedType(type);
      setShowCategories(true);
    }
  };

  const handleAddCategory = async () => {
    try {
      const res = await addCategoryToType(selectedType, newCategory);
      handleResponseMsg(res);
      setNewCategory("");
    } catch (error) {
      toast.error("Kategori Eklenemedi, Bir hata oluştu: " + error);
    }
  };

  const handleDeleteCategory = async (categoryName: string) => {
    try {
      const res = await deleteCategory(selectedType, categoryName);
      handleResponseMsg(res);
    } catch (error) {
      toast.error("Kategori Eklenemedi, Bir hata oluştu: " + error);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut({ callbackUrl: "/login", redirect: true });
    } catch (error) {
      toast.error("Çıkış yapılırken hata oluştu.");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 6 }}>
          <h2>Türler</h2>
          <TextField
            label="Yeni Tür"
            fullWidth
            size="small"
            value={newType}
            onChange={(e) => setNewType(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddType}
            style={{ marginTop: 10, marginBottom: 15 }}
          >
            Tür Ekle
          </Button>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Tür</TableCell>
                <TableCell>Aksiyon</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {bookClassies.map((bookClassy) => (
                <TableRow key={bookClassy._id}>
                  <TableCell>{bookClassy.type}</TableCell>
                  <TableCell>
                    <Button
                      onClick={() => handleToggleCategories(bookClassy.type)}
                      color="primary"
                    >
                      {showCategories && selectedType === bookClassy.type ? (
                        <MeetingRoomIcon />
                      ) : (
                        <NoMeetingRoomIcon />
                      )}
                    </Button>
                    <IconButton
                      color="secondary"
                      onClick={() => handleDeleteType(bookClassy._id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <h2>Kategoriler</h2>
          {showCategories && selectedType && (
            <>
              <TextField
                label="Yeni Kategori"
                fullWidth
                size="small"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddCategory}
                style={{ marginTop: 10, marginBottom: 15 }}
              >
                Kategori Ekle
              </Button>

              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Kategori</TableCell>
                    <TableCell>Aksiyon</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {categories.map((category) => (
                    <TableRow key={category.name}>
                      <TableCell>{category.name}</TableCell>
                      <TableCell>
                        <IconButton
                          color="secondary"
                          onClick={() => handleDeleteCategory(category.name)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </>
          )}
        </Grid>
      </Grid>
      <Fab
        color="primary"
        onClick={navigateToHome}
        sx={{ position: "fixed", bottom: "20px", right: "140px" }}
      >
        <HomeWorkIcon />
      </Fab>
      <Fab
        color="secondary"
        onClick={navigateToRegister}
        sx={{ position: "fixed", bottom: "20px", right: "80px" }}
      >
        <AppRegistrationIcon />
      </Fab>
      <Fab
        color="default"
        onClick={handleSignOut}
        sx={{ position: "fixed", bottom: "20px", right: "20px" }}
      >
        <LogoutIcon />
      </Fab>
    </div>
  );
};

export default ParameterMain;
