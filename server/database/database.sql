---Function is to be executed by trigger ---

CREATE OR REPLACE FUNCTION last_modified_on()
RETURNS TRIGGER 
LANGUAGE PLPGSQL
AS $$
BEGIN
    NEW.modified_on = NOW();
    RETURN NEW;
END;
$$;

---Trigger created---
CREATE TRIGGER trigger_last_modified_on
BEFORE UPDATE 
ON userstable 
FOR EACH ROW
EXECUTE PROCEDURE last_modified_on();

---Adding columns to usertable---

ALTER TABLE userstable ADD COLUMN created_on TIMESTAMPTZ NOT NULL DEFAULT NOW();

ALTER TABLE userstable ADD COLUMN modified_on TIMESTAMPTZ NOT NULL DEFAULT NOW();