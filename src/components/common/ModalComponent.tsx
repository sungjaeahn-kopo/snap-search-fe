import CloseIcon from "@mui/icons-material/CloseRounded";
import { Box, Dialog, DialogContent, DialogTitle, IconButton, Typography } from "@mui/material";
import React from "react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  content: React.ReactNode;
}

const ModalComponent = ({ open, onClose, title, content }: ModalProps) => (
  <Dialog
    open={open}
    onClose={onClose}
    fullWidth
    maxWidth="md"
    PaperProps={{
      sx: {
        borderRadius: "12px",
        padding: "0", // 전체 여백 제거
        background: "white",
        boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.2)",
      },
    }}
  >
    {/* 모달 헤더 */}
    <DialogTitle
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "16px 24px",
        background: "linear-gradient(to right, #1E88E5, #42A5F5)", // 헤더 배경 색상
        color: "white", // 헤더 텍스트 색상
        fontWeight: 700,
        fontSize: "20px",
        borderTopLeftRadius: "12px",
        borderTopRightRadius: "12px",
        marginBottom: "16px",
      }}
    >
      <Typography
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          fontSize: "18px",
          fontWeight: 600,
        }}
      >
        {title}
      </Typography>
      <IconButton onClick={onClose} sx={{ color: "white" }}>
        <CloseIcon />
      </IconButton>
    </DialogTitle>

    {/* 모달 내용 */}
    <DialogContent
      sx={{
        padding: "24px", // 내용 여백 추가
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        background: "#f9f9f9",
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column", // 리스트 형태로 보여줄 때 유리
          gap: "16px",
        }}
      >
        {content}
      </Box>
    </DialogContent>
  </Dialog>
);

export default ModalComponent;
