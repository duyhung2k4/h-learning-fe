import React, { useEffect } from "react";

import { ROUTER } from "@/constants/router";
import { useSaveProcessMutation } from "@/redux/api/auth";
import { useNavigate, useParams } from "react-router";
import Cookies from "js-cookie";
import { TOKEN_TYPE } from "@/model/variable";



const SaveProcess: React.FC = () => {
    const { id } = useParams();
    const [post] = useSaveProcessMutation();
    const navigation = useNavigate();

    const handleSaveProcess = async () => {
        if(!id) return;

        const result = await post({
            profileId: Number(id)
        });
        
        if("error" in result) return;
        
        Cookies.remove(TOKEN_TYPE.PROFILE_UUID_PENDING);
        navigation(ROUTER.ACCOUNT_DOCTOR.href);
    }

    useEffect(() => {
        handleSaveProcess();
    }, [id]);



    if(!id) {
        return <>ProfileId null</>
    }

    return (
        <>SaveProcess</>
    )
}

export default SaveProcess;