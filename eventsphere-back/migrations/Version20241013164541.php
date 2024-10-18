<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20241013164541 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SEQUENCE attendees_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE events_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE feedback_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE meetup_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE users_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE attendees (id INT NOT NULL, user_id_id INT NOT NULL, event_id INT DEFAULT NULL, meetup_id INT DEFAULT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, updated_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_C8C96B259D86650F ON attendees (user_id_id)');
        $this->addSql('CREATE INDEX IDX_C8C96B2571F7E88B ON attendees (event_id)');
        $this->addSql('CREATE INDEX IDX_C8C96B25591E2316 ON attendees (meetup_id)');
        $this->addSql('COMMENT ON COLUMN attendees.created_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('COMMENT ON COLUMN attendees.updated_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('CREATE TABLE events (id INT NOT NULL, owner_id INT NOT NULL, title VARCHAR(100) NOT NULL, description VARCHAR(1500) NOT NULL, max_participants INT NOT NULL, min_participants INT NOT NULL, city VARCHAR(50) NOT NULL, region VARCHAR(50) NOT NULL, address VARCHAR(100) NOT NULL, location VARCHAR(255) NOT NULL, date TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, updated_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_5387574A7E3C61F9 ON events (owner_id)');
        $this->addSql('COMMENT ON COLUMN events.created_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('COMMENT ON COLUMN events.updated_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('CREATE TABLE feedback (id INT NOT NULL, user_id_id INT NOT NULL, event_id INT NOT NULL, meetup_id INT NOT NULL, content VARCHAR(500) NOT NULL, date TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, updated_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_D22944589D86650F ON feedback (user_id_id)');
        $this->addSql('CREATE INDEX IDX_D229445871F7E88B ON feedback (event_id)');
        $this->addSql('CREATE INDEX IDX_D2294458591E2316 ON feedback (meetup_id)');
        $this->addSql('COMMENT ON COLUMN feedback.created_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('COMMENT ON COLUMN feedback.updated_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('CREATE TABLE meetup (id INT NOT NULL, owner_id INT NOT NULL, title VARCHAR(150) NOT NULL, description VARCHAR(1500) NOT NULL, location VARCHAR(100) NOT NULL, date TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, updated_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, max_participants INT NOT NULL, min_participants INT NOT NULL, city VARCHAR(50) NOT NULL, region VARCHAR(50) NOT NULL, address VARCHAR(100) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_9377E287E3C61F9 ON meetup (owner_id)');
        $this->addSql('COMMENT ON COLUMN meetup.created_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('COMMENT ON COLUMN meetup.updated_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('CREATE TABLE users (id INT NOT NULL, ip_address VARCHAR(45) NOT NULL, username VARCHAR(25) NOT NULL, firstname VARCHAR(25) NOT NULL, lastname VARCHAR(25) NOT NULL, email VARCHAR(50) NOT NULL, email_verified BOOLEAN DEFAULT NULL, address VARCHAR(255) DEFAULT NULL, city VARCHAR(100) DEFAULT NULL, postal_code INT DEFAULT NULL, password VARCHAR(255) NOT NULL, role VARCHAR(25) NOT NULL, remember_token VARCHAR(500) NOT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, updated_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, PRIMARY KEY(id))');
        $this->addSql('ALTER TABLE attendees ADD CONSTRAINT FK_C8C96B259D86650F FOREIGN KEY (user_id_id) REFERENCES users (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE attendees ADD CONSTRAINT FK_C8C96B2571F7E88B FOREIGN KEY (event_id) REFERENCES events (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE attendees ADD CONSTRAINT FK_C8C96B25591E2316 FOREIGN KEY (meetup_id) REFERENCES meetup (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE events ADD CONSTRAINT FK_5387574A7E3C61F9 FOREIGN KEY (owner_id) REFERENCES users (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE feedback ADD CONSTRAINT FK_D22944589D86650F FOREIGN KEY (user_id_id) REFERENCES users (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE feedback ADD CONSTRAINT FK_D229445871F7E88B FOREIGN KEY (event_id) REFERENCES events (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE feedback ADD CONSTRAINT FK_D2294458591E2316 FOREIGN KEY (meetup_id) REFERENCES meetup (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE meetup ADD CONSTRAINT FK_9377E287E3C61F9 FOREIGN KEY (owner_id) REFERENCES users (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('DROP SEQUENCE attendees_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE events_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE feedback_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE meetup_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE users_id_seq CASCADE');
        $this->addSql('ALTER TABLE attendees DROP CONSTRAINT FK_C8C96B259D86650F');
        $this->addSql('ALTER TABLE attendees DROP CONSTRAINT FK_C8C96B2571F7E88B');
        $this->addSql('ALTER TABLE attendees DROP CONSTRAINT FK_C8C96B25591E2316');
        $this->addSql('ALTER TABLE events DROP CONSTRAINT FK_5387574A7E3C61F9');
        $this->addSql('ALTER TABLE feedback DROP CONSTRAINT FK_D22944589D86650F');
        $this->addSql('ALTER TABLE feedback DROP CONSTRAINT FK_D229445871F7E88B');
        $this->addSql('ALTER TABLE feedback DROP CONSTRAINT FK_D2294458591E2316');
        $this->addSql('ALTER TABLE meetup DROP CONSTRAINT FK_9377E287E3C61F9');
        $this->addSql('DROP TABLE attendees');
        $this->addSql('DROP TABLE events');
        $this->addSql('DROP TABLE feedback');
        $this->addSql('DROP TABLE meetup');
        $this->addSql('DROP TABLE users');
    }
}
