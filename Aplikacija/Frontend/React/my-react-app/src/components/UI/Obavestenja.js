import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import "./Obavestenja.css";

//type - success(zeleno), warning(zuto), danger(crveno)...
export function obavestenja(message, type = 'info') {
    const alertContainer = document.createElement('div');
    alertContainer.className = 'alert-container';

    const alertElement = document.createElement('div');
    alertElement.className = `alert alert-${type}`;

    const messageElement = document.createElement('span');
    messageElement.textContent = message;
    messageElement.className = 'message';

    const closeButton = document.createElement('button');
    closeButton.textContent = 'X';
    closeButton.className = 'close-button';

    closeButton.addEventListener('click', () => {
        document.body.removeChild(alertContainer);
    });

    alertElement.appendChild(messageElement);
    alertElement.appendChild(closeButton);

    alertContainer.appendChild(alertElement);

    document.body.appendChild(alertContainer);
}



