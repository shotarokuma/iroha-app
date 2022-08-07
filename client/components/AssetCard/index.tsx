import React from "react";

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

export type CardProps = {
  assetId: string;
  balance: string;
};

export const AssetCard: React.FC<CardProps> = ({ assetId, balance }) => {
  return (
    <Card style={{
      margin: '30px',
      width:"275px"
    }}>
      <CardActionArea onClick={() => console.log("charge!!")}>
        <CardContent>
          <Typography variant="h5" gutterBottom>{assetId}</Typography>
          <Typography color="textSecondary" gutterBottom>Your
            balance is </Typography>
        </CardContent>
        <CardContent style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
          <Typography variant="h3" component="h2">{balance}pt</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
};


