import React, { useEffect, useState } from "react";
import className from "classnames/bind";
import styles from "./UserManage.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const cx = className.bind(styles)

const UserManage = () => {
    const movePage = useNavigate();
    const handleBoardManage = () => {
        movePage("/adminPage/boardManage")
    }
    const [userData, setUserData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://bitcoin-kw.namisnt.com:8082/rest/getUserList`);
                setUserData(response.data.data)
            } catch (error) {
                alert("회원정보를 불러오는데 문제가 발생했습니다.");
                window.location.reload();
            }
        }
        fetchData();
    }, [])

    const handleDelete = async (uid) => {
        try {
            let user_uid = parseInt(uid);
            const response = await axios.post(`http://bitcoin-kw.namisnt.com:8082/rest/dropMember`,{
                user_uid : user_uid
            });
            if (response.data.result === 'success') {
                alert("회원 삭제가 정상적으로 이루어졌습니다.")
                window.location.reload();
            } else {
                alert("회원 삭제를 실패했습니다.")
                window.location.reload();
            }
        } catch (error) {
            alert("에러:회원 삭제에 문제가 생겼습니다.")
            window.location.reload();
        }
    };

    return (
        <div>
            <div className={cx("container")}>
                <h1>
                    관리자 페이지
                </h1>
                <div className={cx("button-container")}>
                    <button style={{ backgroundColor: "green", marginLeft: "10px" }}>회원 관리</button>
                    <button onClick={handleBoardManage}>게시글 관리</button>
                </div>
            </div>
            <div className={cx("user-container")}>
                <table className={cx("user-table")}>
                    <thead>
                        <tr>
                            <th className={cx("user-id")}>
                                아이디
                            </th>
                            <th className={cx("user-pw")}>
                                비밀번호
                            </th>
                            <th className={cx("user-nickname")}>
                                닉네임
                            </th>
                            <th className={cx("user-name")}>
                                이름
                            </th>
                            <th className={cx("user-delete")}>
                                삭제
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {userData.map((user) => (
                            <tr key={user.uid}>
                                <td className={cx("user-id")}>
                                    <div>
                                        {user.id}
                                    </div>
                                </td>
                                <td className={cx("user-pw")}>
                                    <div>
                                        {user.pw}
                                    </div>
                                </td>
                                <td className={cx("user-nickname")}>
                                    <div>
                                        {user.nickname}
                                    </div>
                                </td>
                                <td className={cx("user-name")}>
                                    <div>
                                        {user.name}
                                    </div>
                                </td>
                                <td className={cx("user-delete")}>
                                    <div>
                                        <button onClick={()=>handleDelete(user.uid)}>삭제</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default UserManage