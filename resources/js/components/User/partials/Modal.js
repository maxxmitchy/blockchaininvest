import React from "react";

const Modal = ({ open = false, component, form }) => {
    const [modal, setModal] = useState({
        open,
        component,
        form,
    });

    return (
        <React.Fragment>
            {modal.open && (
                <div className="info_modal">
                    <div className={`bg-white py-3 ${modal.form}`}>
                        <FaTimes
                            className="text-white mt-2 fa-times"
                            onClick={() =>
                                setModal({
                                    ...modal,
                                    open: false,
                                    component: "",
                                    form: ""
                                })
                            }
                        />
                        {modal.component}
                    </div>
                </div>
            )}
        </React.Fragment>
    );
};

export default Modal;
