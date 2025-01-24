import React from "react";
import { Card, Typography } from "@mui/material";
import LazyImageComponent from "@/components/common/LazyImageComponent";
import { Career } from '@/types/api';

export const CareerCard = ({ career }: { career: Career }) => (
  <Card
    sx={{
      width: "calc(33.333% - 16px)", // 한 줄에 3개 배치
      minWidth: "150px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "10px",
      textAlign: "center",
      boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
      borderRadius: "8px",
    }}
  >
    <LazyImageComponent
      src={career.teamLogo || "/placeholder.png"}
      alt={`${career.teamName} 로고`}
      width={50}
      height={50}
      style={{ marginBottom: "10px", objectFit: "contain" }}
    />
    <Typography sx={{ fontWeight: 600, fontSize: "14px", mb: 0.5 }}>
      {career.teamName}
    </Typography>
    <Typography sx={{ fontSize: "12px", color: "#555" }}>
      {career.startDate} ~ {career.endDate || "현재"}
    </Typography>
  </Card>
);
