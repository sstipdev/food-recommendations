import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { auth } from "../Auth";
import styles from "../styles/components/Main.module.css";
import { HiCog } from "react-icons/hi";

const Main = () => {
  const [userFood, setUserFood] = useState("");
  const [foodItem, setFoodItem] = useState<string[]>([]);
  const [selected, setSelected] = useState<string[]>([]);

  const userName = auth.currentUser?.displayName;
  const path = useNavigate();
  const handleEditBtn = () => path("/edit");
  const itemFoodListClearBtn = () => {
    setFoodItem([]);
    setSelected([]);
  };

  const onSubmitFood = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (userFood === "") return alert("공백은 금지 입니다.");
    if (userFood.length > 10) {
      setUserFood("");
      return alert("10글자 미만으로 기입해주세요 !");
    }
    setFoodItem((prev) => [...prev, userFood]);
    setUserFood("");
  };

  const selectedFoodItem = (e: React.FormEvent<HTMLDivElement>) => {
    const value = (e.target as HTMLFormElement).textContent;
    if (value !== null) {
    }
  };

  const setFoodValue = (e: React.ChangeEvent<HTMLInputElement>) => setUserFood(e.target.value);

  return (
    <div className={styles.Main_wrap}>
      <div className={styles.Main}>
        <div className={styles.Main_header}>
          <div className={styles.Main_menu_header}>
            <div className={styles.Main_header__title}>
              <div>오늘,</div>
              <span>뭘 </span>
              <span>먹을까?</span>
            </div>
            <div className={styles.Main_header__info}>
              <span onClick={handleEditBtn} className={styles.Main_header__setting_btn}>
                <HiCog />
              </span>
            </div>
          </div>
          <div className={styles.Main_header__userName}>{userName}님, 반갑습니다.</div>
        </div>
        <div className={styles.Main_user_food}>
          <div>오늘은 어떤 음식을 드시고 싶으세요?</div>
          <form onSubmit={onSubmitFood}>
            <input onChange={setFoodValue} value={userFood} placeholder="음식 이름을 여기에 입력 해주세요!" />
          </form>
        </div>
        <div className={styles.Main_food_wrap}>
          <div className={styles.Main_food__manual}>
            <span>오늘, 뭘 먹을래? 이용방법!</span>
          </div>
          <div className={styles.foodItem_header}>
            <div className={styles.foodItem_itemLength}>
              선택된 음식 - {selected.length} 헐 {foodItem.length}
            </div>
            <span onClick={itemFoodListClearBtn} className={styles.foodItem_itemClear__btn}>
              초기화
            </span>
          </div>
          <div className={styles.foodItem}>
            {foodItem?.map((a, i) => {
              return (
                <div onClick={selectedFoodItem} key={i} className={styles.foodItem__list}>
                  <span className={styles.foodItem__list__number}>{i + 1}</span>
                  <span className={styles.foodItem__list__item}>{a}</span>
                </div>
              );
            })}
          </div>
        </div>
        <div className={styles.Main_food_randomResult}>
          <button>결과 확인하기</button>
        </div>
      </div>
    </div>
  );
};

export default Main;
