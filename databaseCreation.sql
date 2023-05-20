-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`location`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`location` (
  `id` INT NOT NULL,
  `place` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`user` (
  `id` INT NOT NULL,
  `username` VARCHAR(45) NOT NULL,
  `fkLocation` INT NOT NULL,
  PRIMARY KEY (`id`, `fkLocation`),
  INDEX `fk_user_location_idx` (`fkLocation` ASC) VISIBLE,
  CONSTRAINT `fk_user_location`
    FOREIGN KEY (`fkLocation`)
    REFERENCES `mydb`.`location` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`networks`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`networks` (
  `id` INT NOT NULL,
  `networkname` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`tier`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`tier` (
  `id` INT NOT NULL,
  `tierdata` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`client`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`client` (
  `id` INT NOT NULL,
  `username` VARCHAR(45) NOT NULL,
  `passwordHash` VARCHAR(45) NOT NULL,
  `membershipNumber` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `phone` VARCHAR(45) NULL,
  `fkTier` INT NOT NULL,
  PRIMARY KEY (`id`, `fkTier`),
  INDEX `fk_client_tier1_idx` (`fkTier` ASC) VISIBLE,
  CONSTRAINT `fk_client_tier1`
    FOREIGN KEY (`fkTier`)
    REFERENCES `mydb`.`tier` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`post`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`post` (
  `id` INT NOT NULL,
  `postdata` VARCHAR(45) NOT NULL,
  `fkClient` INT NOT NULL,
  `fkNetworks` INT NOT NULL,
  PRIMARY KEY (`id`, `fkClient`, `fkNetworks`),
  INDEX `fk_post_client1_idx` (`fkClient` ASC) VISIBLE,
  INDEX `fk_post_networks1_idx` (`fkNetworks` ASC) VISIBLE,
  CONSTRAINT `fk_post_client1`
    FOREIGN KEY (`fkClient`)
    REFERENCES `mydb`.`client` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_post_networks1`
    FOREIGN KEY (`fkNetworks`)
    REFERENCES `mydb`.`networks` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`interactions`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`interactions` (
  `id` INT NOT NULL,
  `reaction` VARCHAR(45) NOT NULL,
  `fkUser` INT NOT NULL,
  PRIMARY KEY (`id`, `fkUser`),
  INDEX `fk_interactions_user1_idx` (`fkUser` ASC) VISIBLE,
  CONSTRAINT `fk_interactions_user1`
    FOREIGN KEY (`fkUser`)
    REFERENCES `mydb`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`trends`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`trends` (
  `id` INT NOT NULL,
  `word` VARCHAR(45) NOT NULL,
  `value` INT NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`postTrends`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`postTrends` (
  `id` INT NOT NULL,
  `fkPost` INT NOT NULL,
  `fkTrends` INT NOT NULL,
  PRIMARY KEY (`id`, `fkPost`, `fkTrends`),
  INDEX `fk_post_has_trends_post1_idx` (`fkPost` ASC) VISIBLE,
  INDEX `fk_postTrends_trends1_idx` (`fkTrends` ASC) VISIBLE,
  CONSTRAINT `fk_post_has_trends_post1`
    FOREIGN KEY (`fkPost`)
    REFERENCES `mydb`.`post` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_postTrends_trends1`
    FOREIGN KEY (`fkTrends`)
    REFERENCES `mydb`.`trends` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`coments`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`coments` (
  `id` INT NOT NULL,
  `dateTime` DATETIME NOT NULL,
  `feeling` FLOAT NOT NULL,
  `comentData` VARCHAR(45) NOT NULL,
  `fkPost` INT NOT NULL,
  `fkUser` INT NOT NULL,
  PRIMARY KEY (`id`, `fkPost`, `fkUser`),
  INDEX `fk_coments_user1_idx` (`fkUser` ASC) VISIBLE,
  INDEX `fk_coments_post1_idx` (`fkPost` ASC) VISIBLE,
  CONSTRAINT `fk_coments_user1`
    FOREIGN KEY (`fkUser`)
    REFERENCES `mydb`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_coments_post1`
    FOREIGN KEY (`fkPost`)
    REFERENCES `mydb`.`post` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`comentTrends`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`comentTrends` (
  `id` INT NOT NULL,
  `fkTrends` INT NOT NULL,
  `fkComments` INT NOT NULL,
  PRIMARY KEY (`id`, `fkTrends`, `fkComments`),
  INDEX `fk_comentTrends_trends1_idx` (`fkTrends` ASC) VISIBLE,
  INDEX `fk_comentTrends_coments1_idx` (`fkComments` ASC) VISIBLE,
  CONSTRAINT `fk_comentTrends_trends1`
    FOREIGN KEY (`fkTrends`)
    REFERENCES `mydb`.`trends` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_comentTrends_coments1`
    FOREIGN KEY (`fkComments`)
    REFERENCES `mydb`.`coments` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`interactionsClientNetworks`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`interactionsClientNetworks` (
  `id` INT NOT NULL,
  `fkInteractions` INT NOT NULL,
  `fkPost` INT NOT NULL,
  PRIMARY KEY (`id`, `fkInteractions`, `fkPost`),
  INDEX `fk_interactions_has_client_has_networks_interactions1_idx` (`fkInteractions` ASC) VISIBLE,
  INDEX `fk_interactions_has_client_has_networks_post1_idx` (`fkPost` ASC) VISIBLE,
  CONSTRAINT `fk_interactions_has_client_has_networks_interactions1`
    FOREIGN KEY (`fkInteractions`)
    REFERENCES `mydb`.`interactions` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_interactions_has_client_has_networks_post1`
    FOREIGN KEY (`fkPost`)
    REFERENCES `mydb`.`post` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`userNetworks`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`userNetworks` (
  `id` INT NOT NULL,
  `fkUser` INT NOT NULL,
  `fkNetworks` INT NOT NULL,
  PRIMARY KEY (`id`, `fkUser`, `fkNetworks`),
  INDEX `fk_userNetworks_user1_idx` (`fkUser` ASC) VISIBLE,
  INDEX `fk_userNetworks_networks1_idx` (`fkNetworks` ASC) VISIBLE,
  CONSTRAINT `fk_userNetworks_user1`
    FOREIGN KEY (`fkUser`)
    REFERENCES `mydb`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_userNetworks_networks1`
    FOREIGN KEY (`fkNetworks`)
    REFERENCES `mydb`.`networks` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
