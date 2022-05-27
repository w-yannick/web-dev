export class Settings {

    /*
     * MAX_ANGLE
     * Angle max en radians entre la ligne de visée et la droite x = 0
     */
    public static MAX_ANGLE = 30 * Math.PI / 180;

    /*
     * ARENA_LENGTH
     * Longueur entre le point de départ des pierres et le bout de la piste
     */
    public static ARENA_LENGTH = 38.5;

    /*
     * HALF_ARENA_WIDTH
     * Distance entre le bord de la piste et la droite x = 0
     */
    public static HALF_ARENA_WIDTH = 2.25;

    /*
     * STONE_RADIUS
     * Rayon d'une pierre de curling
     */
    public static STONE_RADIUS = 0.145;

    /*
     * CANVAS_RATIO
     * Ratio largeur/longueur de la fenêtre de jeu pour les caméras et les redimensions
     */
    public static CANVAS_RATIO = 900 / 500;

    /*
     * STONE_WEIGHT
     * Masse d'une pierre de curling en kg
     */
    public static STONE_WEIGHT = 19;

    /*
     * HUD_WIDTH
     * Largeur du head-up display
     */
    public static HUD_WIDTH = 900;

    /*
     * HUD_HEIGHT
     * Hauteur du head-up display
     */
    public static HUD_HEIGHT = 500;

    /*
     * NUMBER_OF_STONES
     * Nombre de pierres par manche par joueur
     */
    public static NUMBER_OF_STONES = 2;

    /*
     * NUMBER_OF_STONES
     * Nombre de manches
     */
    public static NUMBER_OF_ROUNDS = 1;

    /* G
     * Accélération gravitationnelle
     */
    public static G = -9.81;

    /*
     * INITIAL_SPEED
     * Vitesse initiale des pierres en m/s
     */
    public static INITIAL_SPEED = 2;

    /*
     * INITIAL_SPEED_FACTOR_RANGE
     * Facteur minimal et maximal pour la sélection de la vitesse
     */
    public static INITIAL_SPEED_FACTOR_RANGE = [0.5, 3];

    /*
     * FRICTION
     * Coefficient de frottement entre la pierre et la glace
     */
    public static FRICTION = 0.04;

    /*
     * FRAME_PERIOD
     * Durée en secondes entre deux actualisations
     */
    public static FRAME_PERIOD = 1 / 60;

    /*
     * HOUSE_RADIUS
     * Rayon en mètres de la maison
     */
    public static HOUSE_RADIUS = 3.65 / 2;

    /*
     * START_LINE_Y
     * La ligne de départ suit l'équation y = 6.5
     */
    public static START_LINE_Y = 6.5;

    /*
     * BROOM_FRICTION_FACTOR
     * Le facteur utilisé sur le frottement des surfaces balayées
     */
    public static BROOM_FRICTION_FACTOR = 1 / 6;

    /*
     * PARTICLE_COUNT
     * Nombre de confettis qui tombent à la fin d'une partie gagnée
    */
    public static PARTICLE_COUNT = 100;

    /*
     * PARTICLE_Y_MAX
     * La composante Ymaximale d'un confetti
    */
    public static PARTICLE_Y_MAX = Settings.ARENA_LENGTH;

    /*
     * PARTICLE_Z_MAX
     * La hauteur maximale d'un confetti
    */
    public static PARTICLE_Z_MAX = 2;

    /*
     * STONE_JUMP_HEIGHT_MAX
     * La hauteur maximale de saut d'un confetti
    */
    public static STONE_JUMP_HEIGHT_MAX = 0.1;

    /*
     * ANIMATION_TIME
     * Temps que prend l'animation à la fin d'une partie (ms)
    */
    public static ANIMATION_TIME = 5000;

    /*
     * ANIMATION_VELOCITY
     * La vitesse de l'animation à la fin d'une partie
    */
    public static ANIMATION_VELOCITY = 0.01;


}
