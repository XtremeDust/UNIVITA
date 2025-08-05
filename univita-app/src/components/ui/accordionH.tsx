'use client'
import React, { useState } from "react";
import {sectionH} from "@/data/headerSection";

function Accordeon (){

const [isOpen, setOpen] = useState<number|null>(null);
const StatePanel = (index:number)=>{setOpen(isOpen => isOpen===index ? null : index)};

    return(
        <div>

        </div>
    );
}

export default Accordeon