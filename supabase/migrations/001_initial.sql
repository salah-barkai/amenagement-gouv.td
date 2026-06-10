-- ============================================================
-- Ministère de l'Aménagement du Territoire - Schéma initial
-- ============================================================

-- Activer les extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- TABLE: actualites
-- ============================================================
CREATE TABLE IF NOT EXISTS actualites (
  id          UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  titre       TEXT        NOT NULL,
  contenu     TEXT        NOT NULL,
  extrait     TEXT,
  image_url   TEXT,
  categorie   TEXT        NOT NULL DEFAULT 'Actualité',
  publie      BOOLEAN     NOT NULL DEFAULT false,
  publie_le   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  auteur_id   UUID        REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- TABLE: projets
-- ============================================================
CREATE TABLE IF NOT EXISTS projets (
  id           UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  titre        TEXT        NOT NULL,
  description  TEXT        NOT NULL,
  contenu      TEXT,
  image_url    TEXT,
  statut       TEXT        NOT NULL DEFAULT 'En cours',
  localisation TEXT,
  budget       NUMERIC,
  date_debut   DATE,
  date_fin     DATE,
  publie       BOOLEAN     NOT NULL DEFAULT false,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT statut_check CHECK (statut IN ('En cours', 'Terminé', 'Planifié', 'Suspendu'))
);

-- ============================================================
-- TABLE: documents
-- ============================================================
CREATE TABLE IF NOT EXISTS documents (
  id           UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  titre        TEXT        NOT NULL,
  description  TEXT,
  fichier_url  TEXT,
  categorie    TEXT        NOT NULL DEFAULT 'Publication',
  publie       BOOLEAN     NOT NULL DEFAULT false,
  publie_le    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT categorie_doc_check CHECK (
    categorie IN ('Texte officiel', 'Rapport', 'Publication', 'Communiqué', 'Appel d''offres')
  )
);

-- ============================================================
-- TABLE: galerie
-- ============================================================
CREATE TABLE IF NOT EXISTS galerie (
  id          UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  titre       TEXT        NOT NULL,
  image_url   TEXT        NOT NULL,
  description TEXT,
  ordre       INTEGER     NOT NULL DEFAULT 0,
  publie      BOOLEAN     NOT NULL DEFAULT true,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- TABLE: contacts (messages reçus via le formulaire)
-- ============================================================
CREATE TABLE IF NOT EXISTS contacts (
  id          UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  nom         TEXT        NOT NULL,
  email       TEXT        NOT NULL,
  telephone   TEXT,
  sujet       TEXT        NOT NULL,
  message     TEXT        NOT NULL,
  lu          BOOLEAN     NOT NULL DEFAULT false,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- TABLE: pages (contenu dynamique des pages statiques)
-- ============================================================
CREATE TABLE IF NOT EXISTS pages (
  id          UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  slug        TEXT        UNIQUE NOT NULL,
  titre       TEXT        NOT NULL,
  contenu     TEXT,
  publie      BOOLEAN     NOT NULL DEFAULT true,
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- TABLE: profils (données supplémentaires sur les utilisateurs admin)
-- ============================================================
CREATE TABLE IF NOT EXISTS profils (
  id          UUID        PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  nom         TEXT,
  prenom      TEXT,
  role        TEXT        NOT NULL DEFAULT 'editeur',
  avatar_url  TEXT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT role_check CHECK (role IN ('admin', 'editeur', 'lecteur'))
);

-- ============================================================
-- TRIGGERS: updated_at automatique
-- ============================================================
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER actualites_updated_at
  BEFORE UPDATE ON actualites
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER projets_updated_at
  BEFORE UPDATE ON projets
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER pages_updated_at
  BEFORE UPDATE ON pages
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

ALTER TABLE actualites  ENABLE ROW LEVEL SECURITY;
ALTER TABLE projets     ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents   ENABLE ROW LEVEL SECURITY;
ALTER TABLE galerie     ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts    ENABLE ROW LEVEL SECURITY;
ALTER TABLE pages       ENABLE ROW LEVEL SECURITY;
ALTER TABLE profils     ENABLE ROW LEVEL SECURITY;

-- Lecture publique des contenus publiés
CREATE POLICY "actualites_public_read" ON actualites
  FOR SELECT USING (publie = true);

CREATE POLICY "projets_public_read" ON projets
  FOR SELECT USING (publie = true);

CREATE POLICY "documents_public_read" ON documents
  FOR SELECT USING (publie = true);

CREATE POLICY "galerie_public_read" ON galerie
  FOR SELECT USING (publie = true);

CREATE POLICY "pages_public_read" ON pages
  FOR SELECT USING (publie = true);

-- Insertion publique pour les contacts
CREATE POLICY "contacts_public_insert" ON contacts
  FOR INSERT WITH CHECK (true);

-- Admin : accès complet pour les utilisateurs authentifiés
CREATE POLICY "actualites_auth_all" ON actualites
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "projets_auth_all" ON projets
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "documents_auth_all" ON documents
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "galerie_auth_all" ON galerie
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "contacts_auth_all" ON contacts
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "pages_auth_all" ON pages
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "profils_auth_all" ON profils
  FOR ALL USING (auth.role() = 'authenticated');

-- ============================================================
-- DONNÉES INITIALES
-- ============================================================

-- Pages statiques par défaut
INSERT INTO pages (slug, titre, contenu, publie) VALUES
(
  'a-propos',
  'À propos du Ministère',
  '<h2>Notre Mission</h2><p>Le Ministère de l''Aménagement du Territoire, de l''Habitat et de l''Urbanisme du Tchad a pour mission principale d''élaborer et de mettre en œuvre la politique nationale en matière d''aménagement du territoire, de l''habitat et de l''urbanisme.</p><h2>Nos Attributions</h2><ul><li>Élaboration et mise en œuvre de la politique nationale d''aménagement du territoire</li><li>Planification et coordination du développement urbain et rural</li><li>Gestion du patrimoine foncier de l''État</li><li>Promotion de l''habitat social</li><li>Coordination des projets d''infrastructures urbaines</li></ul>',
  true
),
(
  'mot-ministre',
  'Mot du Ministre',
  '<p>Bienvenue sur le portail officiel du Ministère de l''Aménagement du Territoire, de l''Habitat et de l''Urbanisme de la République du Tchad. Notre ministère s''engage à œuvrer pour un développement équilibré et durable du territoire national, au bénéfice de tous les citoyens tchadiens.</p>',
  true
);

-- Actualités exemples
INSERT INTO actualites (titre, extrait, contenu, categorie, publie, publie_le) VALUES
(
  'Lancement du Programme National d''Aménagement du Territoire 2025-2030',
  'Le Ministère lance officiellement son programme quinquennal visant à moderniser l''aménagement du territoire dans toutes les régions du Tchad.',
  '<p>Le Ministère de l''Aménagement du Territoire, de l''Habitat et de l''Urbanisme a officiellement lancé son Programme National d''Aménagement du Territoire pour la période 2025-2030.</p><p>Ce programme ambitieux prévoit des investissements majeurs dans les infrastructures urbaines, la planification des villes secondaires et la mise en place de schémas directeurs régionaux.</p>',
  'Programme',
  true,
  NOW() - INTERVAL '2 days'
),
(
  'Réunion d''évaluation des projets d''aménagement du territoire',
  'Une réunion d''évaluation s''est tenue au ministère pour faire le point sur l''avancement des projets en cours.',
  '<p>Une importante réunion d''évaluation s''est tenue au siège du Ministère de l''Aménagement du Territoire. Cette réunion a réuni les directeurs régionaux et les chefs de projets pour faire le bilan des réalisations de l''année écoulée.</p>',
  'Actualité',
  true,
  NOW() - INTERVAL '5 days'
),
(
  'Atelier de formation sur la planification urbaine',
  'Un atelier de renforcement des capacités en planification urbaine a été organisé à N''Djaména.',
  '<p>Dans le cadre du renforcement des capacités de ses agents, le Ministère a organisé un atelier de formation sur les techniques modernes de planification urbaine. Cet atelier a bénéficié du soutien technique de partenaires internationaux.</p>',
  'Formation',
  true,
  NOW() - INTERVAL '10 days'
);

-- Projets exemples
INSERT INTO projets (titre, description, statut, localisation, publie) VALUES
(
  'Schéma Directeur d''Aménagement de N''Djaména',
  'Élaboration et mise en œuvre du schéma directeur de la capitale pour les 20 prochaines années, intégrant la croissance démographique et les enjeux environnementaux.',
  'En cours',
  'N''Djaména',
  true
),
(
  'Programme de Construction de Logements Sociaux',
  'Construction de 5 000 logements sociaux accessibles aux ménages à revenus modestes dans les principales villes du Tchad.',
  'En cours',
  'National',
  true
),
(
  'Aménagement de la Zone Industrielle de Farcha',
  'Réhabilitation et extension de la zone industrielle de Farcha pour accueillir de nouvelles unités de production.',
  'Planifié',
  'N''Djaména - Farcha',
  true
);
