/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from "react-router-dom";
import { useRegisterForm } from "../../../hooks/useRegisterForm.js";
import { registerUserData } from "../../../types/types";
import styles from "./registerFormUser.module.scss";
import GroupControls from "../../../../common/groupControls/GroupControls.js";
import { IoInformationCircleOutline } from "react-icons/io5";
import { useState } from "react";


const RegisterFormUser = () => {
  const { handleSubmit, handleSignup, register, errors } = useRegisterForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: registerUserData) => {
    setLoading(true);
    console.log('Submitting data:', data);
    const validationErrors = Object.values(errors).some(err => err);

    if (validationErrors) {
      console.log('Validation errors:', errors);
    } else {
      await handleSignup(data);
    }

    setLoading(false);
  };

  return (
      <form
          className={styles.registerFormUser}
          onSubmit={handleSubmit(onSubmit)}
      >
        <h2>Inscription</h2>
        <div className={styles.formSection}>
          <GroupControls
              name="lastname"
              id="lastname-register"
              register={register}
              type="text"
              error={errors.lastname?.message}
              placeholder="Nom"
          />
          <GroupControls
              name="firstname"
              id="firstname-register"
              register={register}
              type="text"
              error={errors.firstname?.message}
              placeholder="Prénom"
          />
        </div>
        <div className={styles.formSection}>
          <GroupControls
              name="username"
              id="nickname-register"
              register={register}
              type="text"
              error={errors.username?.message}
              placeholder="Pseudo"
          />
          <GroupControls
              name="email"
              id="email-register"
              register={register}
              type="email"
              error={errors.email?.message}
              placeholder="Email"
          />
        </div>
        <div className={styles.formSection}>
          <GroupControls
              name="city"
              id="city-register"
              register={register}
              type="text"
              error={errors.city?.message}
              placeholder="Ville"
          />
          <GroupControls
              name="postal_code"
              id="postal_code-register"
              register={register}
              type="text"
              error={errors.postal_code?.message}
              placeholder="Code postal"
          />
        </div>
        <GroupControls
            name="address"
            id="address-register"
            register={register}
            type="text"
            error={errors.address?.message}
            placeholder="Adresse"
        />
        <GroupControls
            name="phone_number"
            id="phone-register"
            register={register}
            type="tel"
            error={errors.phone_number?.message}
            placeholder="Numéro de téléphone"
        />
        <GroupControls
            name="password"
            id="password-register"
            register={register}
            type="password"
            error={errors.password?.message}
            placeholder="Mot de passe"
        />

        <p>
          <IoInformationCircleOutline /> Votre mot de passe doit dépasser 8 caractères ainsi que contenir au moins un
          caractère spécial et un chiffre.
        </p>

        <GroupControls
            name="confirm_password"
            id="confirm_password-register"
            register={register}
            type="password"
            error={errors.confirm_password?.message}
            placeholder="Confirmation mot de passe"
        />

        <div className={styles.containerInfosRegister}>
          <p>Déjà inscrit ?</p>
          <Link to="/login">Connectez-vous</Link>
        </div>

        <div className="form-group">
          <input
              type="checkbox"
              id="terms"
              {...register("terms_accepted")}
              required
          />
          <label htmlFor="terms">J'accepte les <a href="/terms-and-conditions">conditions générales</a> et la <a
              href="/privacy-policy">politique de confidentialité</a>.</label>
        </div>

        <div className="form-group">
          <input
              type="checkbox"
              id="newsletter"
              {...register("newsletter_subscribed")}
          />
          <label htmlFor="newsletter">Je souhaite recevoir des offres et des communications par email.</label>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'En cours...' : 'S\'inscrire'}
        </button>
      </form>
  );
};

export default RegisterFormUser;
