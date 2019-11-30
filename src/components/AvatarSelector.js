import React, { useState } from 'react';
import { Paper, Typography, Box, LinearProgress, Badge } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
    root: {
        "vertical-align": "top",
        
    },
    dot:{
        width:"20px",
        height:"20px",

    },
    badge: {
        backgroundColor: '#44b700',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '20px',
            height: '20px',
            borderRadius: '50%',
            animation: '$ripple 1.2s infinite ease-in-out',
            border: '5px solid #44b700',
            content: '""',
        },
    },
    '@keyframes ripple': {
        '0%': {
            transform: 'scale(.8)',
            opacity: 1,
        },
        '100%': {
            transform: 'scale(1.4)',
            opacity: 0,
        },
    },
}
));

const icons = [
    "001-mask.svg", "018-mask-3.svg", "035-superheroe-4.svg",
    "002-superhero.svg", "019-superheroe-2.svg", "036-superheroe-5.svg",
    "003-help.svg", "020-watch.svg", "037-comic-1.svg",
    "004-mask-1.svg", "021-mask-4.svg", "038-shield-3.svg",
    "005-robot.svg", "022-belt.svg", "039-superhero-4.svg",
    "006-sword.svg", "023-thunder.svg", "040-mask-7.svg",
    "007-shield.svg", "024-boom.svg", "041-villain.svg",
    "008-superheroe.svg", "025-superhero-2.svg", "042-shield-4.svg",
    "009-comic.svg", "026-superhero-3.svg", "043-superheroe-6.svg",
    "010-superpowers.svg", "027-eye.svg", "044-fire.svg",
    "011-fly.svg", "028-hand.svg", "045-villain-1.svg",
    "012-mask-2.svg", "029-mask-5.svg", "046-superheroe-7.svg",
    "013-superheroe-1.svg", "030-glasses.svg", "047-mask-8.svg",
    "014-shield-1.svg", "031-mask-6.svg", "048-shield-5.svg",
    "015-superpower.svg", "032-superpower-1.svg", "049-superheroe-8.svg",
    "016-shield-2.svg", "033-superheroe-3.svg", "050-cape.svg",
    "017-superhero-1.svg", "034-lightsaber.svg"
]





export default function AvatarSelector(props) {
    const classes = useStyles()
    const icon_list = []
    const onClick = (filename) => {
        props.onChange(filename)
    }
    for (const [index, value] of icons.entries()) {
        let url = "/images/heros/" + value

        if (value == props.value)
            icon_list.push(
                <Badge
                    className={classes.root}
                    badgeContent={5} color="primary"
                    overlap="circle"
                    key={index}
                    variant="dot"
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "right"
                    }} classes={classes}>
                    <img src={url} className={classes.laser_avatar}  width="80px" />
                </Badge>)
        else
            icon_list.push(<img src={url} className={classes.laser_avatar} key={index} width="80px" onClick={() => onClick(value)} />)
    }
    return (
        <Box key="box1">
            {icon_list}
        </Box>
    );
}


