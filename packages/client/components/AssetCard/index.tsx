import { Role } from "../../../graphql/client";
import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

export interface CardProps {
  assetId: string;
  balance: string;
  role: Role;
  setTarget?: (target: string | null) => void;
  setOpen?: (open: boolean) => void;
}

export const AssetCard: React.FC<CardProps> = ({
  assetId,
  balance,
  role,
  setTarget,
  setOpen,
}) => {
  const handleClickCard = (): void => {
    if (role === Role.Admin && setOpen && setTarget) {
      setOpen(true);
      setTarget(assetId);
    }
  };

  return (
    <Card
      style={{
        margin: "30px",
        width: "275px",
      }}
    >
      <CardActionArea onClick={handleClickCard}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            {assetId}
          </Typography>
          <Typography color="textSecondary" gutterBottom>
            Your balance is{" "}
          </Typography>
        </CardContent>
        <CardContent
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h3" component="h2">
            {balance}pt
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
